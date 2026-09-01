import { createServerFn } from '@tanstack/react-start'
import Stripe from 'stripe'
import type { InvestmentReturnResult, MarketTicker } from '@/lib/types'
import { seedCollections, seedBranchSlugs } from '@/data/seed/catalog'
import { branches } from '@/data/content'
import {
  catalogProducts,
  getProductBySlug,
  getProductsByMetal,
  searchProducts,
  getRelatedProducts,
} from '@/lib/db/catalog'
import { faqCopy, insightArticles, emailCopy } from '@/data/copy'
import { sendEmail } from '@/lib/email'
import { testimonials, pressLogos, comparisonRows } from '@/data/content'
import { getSupabaseServiceClient, isSupabaseServerConfigured } from '@/lib/supabase/server'
import { generateOrderNumber, memoryStore, toOrderSummary, type MemoryOrder } from '@/lib/db/memory-store'
import { buildMarketTicker } from '@/lib/metals/market'
import { getSpotPrices, pricePerGram, priceProducts } from '@/lib/metals/spot'

export const getMarketTicker = createServerFn({ method: 'GET' }).handler(
  async (): Promise<MarketTicker> => {
    const spots = await getSpotPrices()
    return buildMarketTicker(spots.goldPrice, spots.silverPrice, spots.updatedAt, {
      goldChangePct: spots.goldChangePct,
      silverChangePct: spots.silverChangePct,
      source: spots.source,
    })
  },
)

export const getFeaturedProducts = createServerFn({ method: 'GET' }).handler(
  async () => (await priceProducts(catalogProducts)).slice(0, 4),
)

export const getAllProducts = createServerFn({ method: 'POST' })
  .validator((data: { metal?: string; q?: string; sort?: string }) => data ?? {})
  .handler(async ({ data }) => {
    let list = await priceProducts(
      data.q ? searchProducts(data.q) : getProductsByMetal(data.metal),
    )
    if (data.sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price)
    if (data.sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    if (data.sort === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    return list
  })

export const getProduct = createServerFn({ method: 'POST' })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const product = getProductBySlug(slug)
    if (!product) return null
    const [priced] = await priceProducts([product])
    return {
      ...priced,
      related: await priceProducts(getRelatedProducts(slug)),
      description:
        'Investment-grade precious metal sourced from LBMA-approved refineries. Each item ships fully insured with certificate of authenticity.',
      bulkTiers: [
        { minQty: 1, price: priced.price },
        { minQty: 5, price: Math.round(priced.price * 0.99 * 100) / 100 },
        { minQty: 10, price: Math.round(priced.price * 0.97 * 100) / 100 },
      ],
    }
  })

export const getCollection = createServerFn({ method: 'POST' })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const col = seedCollections.find((c) => c.slug === slug)
    if (!col) return null
    const products = await priceProducts(
      catalogProducts.filter((p) => col.productSlugs.includes(p.slug)),
    )
    return { ...col, products }
  })

export const getCollections = createServerFn({ method: 'GET' }).handler(async () =>
  seedCollections.map((c) => ({
    ...c,
    productCount: c.productSlugs.length,
  })),
)

type InvestmentInput = {
  metalType: string
  amount: number
  durationMonths: number
  currency: string
}

export const calculateInvestmentReturn = createServerFn({ method: 'POST' })
  .validator((data: InvestmentInput) => data)
  .handler(async ({ data }): Promise<InvestmentReturnResult> => {
    const annualRates: Record<string, number> = {
      gold: 0.085,
      silver: 0.062,
      platinum: 0.055,
    }
    const rate = annualRates[data.metalType] ?? 0.07
    const years = data.durationMonths / 12
    const projectedValue = data.amount * Math.pow(1 + rate, years)
    const estimatedReturn = projectedValue - data.amount
    return {
      initialAmount: data.amount,
      projectedValue: Math.round(projectedValue * 100) / 100,
      estimatedReturn: Math.round(estimatedReturn * 100) / 100,
      percentageReturn: Math.round((estimatedReturn / data.amount) * 10000) / 100,
      disclaimer:
        'Projected values are estimates only and do not guarantee future returns.',
    }
  })

type BuybackInput = {
  materialType: string
  karat: string
  weightG: number
  email?: string
}

const KARAT_PURITY: Record<string, number> = {
  '24k': 0.999,
  '22k': 0.916,
  '18k': 0.75,
  '14k': 0.585,
  '10k': 0.417,
  silver: 0.925,
}

export const calculateBuybackEstimate = createServerFn({ method: 'POST' })
  .validator((data: BuybackInput) => data)
  .handler(async ({ data }) => {
    const spots = await getSpotPrices()
    const purity = KARAT_PURITY[data.karat] ?? 0.585
    const spotPerGram =
      data.materialType === 'silver'
        ? pricePerGram(spots.silverPrice)
        : pricePerGram(spots.goldPrice)
    const payoutRate = 0.85
    const estimated = spotPerGram * data.weightG * purity * payoutRate
    const record = {
      id: crypto.randomUUID(),
      ...data,
      estimatedTotal: Math.round(estimated * 100) / 100,
      createdAt: new Date().toISOString(),
    }
    memoryStore.buybackQuotes.push(record)
    if (isSupabaseServerConfigured() && data.email) {
      const supabase = getSupabaseServiceClient()!
      await supabase.from('buyback_quotes').insert({
        email: data.email,
        estimated_total_minor: Math.round(estimated * 100),
        status: 'draft',
      })
    }
    return record
  })

type AppointmentInput = {
  serviceType: string
  firstName: string
  lastName: string
  email: string
  phone: string
  preferredDate: string
  preferredTime: string
  mode?: string
  branchId?: string
  address?: string
}

export const createAppointment = createServerFn({ method: 'POST' })
  .validator((data: AppointmentInput) => data)
  .handler(async ({ data }) => {
    const appointment = {
      id: crypto.randomUUID(),
      ...data,
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
    }
    memoryStore.appointments.push(appointment)
    if (isSupabaseServerConfigured()) {
      const supabase = getSupabaseServiceClient()!
      await supabase.from('appointments').insert({
        service_type: data.serviceType,
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        preferred_date: data.preferredDate,
        preferred_time: data.preferredTime,
        mode: data.mode ?? 'in_branch',
        branch_id: data.branchId ?? null,
        address: data.address ?? null,
        status: 'pending',
      })
    }
    try {
      const tpl = emailCopy.appointmentConfirmation(
        data.firstName,
        data.preferredDate,
        data.preferredTime,
      )
      await sendEmail({ to: data.email, subject: tpl.subject, text: tpl.body })
    } catch {
      /* email optional in demo */
    }
    return appointment
  })

type ContactInput = {
  name: string
  email: string
  subject: string
  message: string
}

export const submitContactMessage = createServerFn({ method: 'POST' })
  .validator((data: ContactInput) => data)
  .handler(async ({ data }) => {
    memoryStore.contactMessages.push({ ...data, createdAt: new Date().toISOString() })
    try {
      await sendEmail({
        to: process.env.CONTACT_INBOX ?? 'hello@primegoldtrading.com',
        subject: `Contact: ${data.subject}`,
        text: `From: ${data.name} <${data.email}>\n\n${data.message}`,
      })
    } catch {
      /* email optional in demo */
    }
    return { success: true }
  })

type NewsletterInput = { email: string }

export const subscribeNewsletter = createServerFn({ method: 'POST' })
  .validator((data: NewsletterInput) => data)
  .handler(async ({ data }) => {
    memoryStore.subscribers.add(data.email)
    if (isSupabaseServerConfigured()) {
      const supabase = getSupabaseServiceClient()!
      await supabase.from('newsletter_subscribers').upsert({ email: data.email })
    }
    return { success: true, email: data.email, message: emailCopy.newsletterWelcome.body }
  })

type BranchQuery = { latitude: number; longitude: number }

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 3959
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export const getNearestBranches = createServerFn({ method: 'POST' })
  .validator((data: BranchQuery) => data)
  .handler(async ({ data }) => {
    const withDistance = branches.map((branch) => ({
      ...branch,
      slug: seedBranchSlugs[branch.id] ?? branch.city.toLowerCase().replace(/\s+/g, '-'),
      distance: Math.round(
        haversineDistance(data.latitude, data.longitude, branch.latitude, branch.longitude) * 10,
      ) / 10,
    }))
    return withDistance.sort((a, b) => a.distance - b.distance).slice(0, 5)
  })

export const getBranches = createServerFn({ method: 'GET' }).handler(async () =>
  branches.map((b) => ({
    ...b,
    slug: seedBranchSlugs[b.id] ?? b.city.toLowerCase().replace(/\s+/g, '-'),
  })),
)

export const getBranch = createServerFn({ method: 'POST' })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const branch = branches.find(
      (b) => (seedBranchSlugs[b.id] ?? b.city.toLowerCase().replace(/\s+/g, '-')) === slug,
    )
    return branch
      ? { ...branch, slug: seedBranchSlugs[branch.id] ?? slug }
      : null
  })

export const getHomepageContent = createServerFn({ method: 'GET' }).handler(async () => ({
  insights: insightArticles.map(({ slug, title, imageUrl, excerpt }) => ({
    id: slug,
    slug,
    title,
    imageUrl,
    excerpt,
  })),
  testimonials,
  faqs: faqCopy,
  pressLogos,
  comparisonRows,
}))

export const getInsight = createServerFn({ method: 'POST' })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => insightArticles.find((a) => a.slug === slug) ?? null)

export const getInsights = createServerFn({ method: 'GET' }).handler(async () => insightArticles)

type CheckoutInput = {
  lines: Array<{ productId: string; name: string; price: number; qty: number }>
  email: string
  name: string
  shippingMethod: 'standard' | 'premium'
}

export const createCheckoutSession = createServerFn({ method: 'POST' })
  .validator((data: CheckoutInput) => data)
  .handler(async ({ data }) => {
    const shipping = data.shippingMethod === 'premium' ? 35 : 25
    const subtotal = data.lines.reduce((s, l) => s + l.price * l.qty, 0)
    const total = subtotal + shipping
    const orderNumber = generateOrderNumber()

    const order: MemoryOrder = {
      id: crypto.randomUUID(),
      orderNumber,
      email: data.email,
      name: data.name,
      lines: data.lines,
      subtotal,
      shipping,
      total,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }
    memoryStore.orders.push(order)

    try {
      const tpl = emailCopy.orderConfirmation(orderNumber)
      await sendEmail({ to: data.email, subject: tpl.subject, text: tpl.body })
    } catch {
      /* email optional in demo */
    }

    if (process.env.STRIPE_SECRET_KEY) {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        customer_email: data.email,
        line_items: [
          ...data.lines.map((l) => ({
            price_data: {
              currency: 'usd',
              product_data: { name: l.name },
              unit_amount: Math.round(l.price * 100),
            },
            quantity: l.qty,
          })),
          {
            price_data: {
              currency: 'usd',
              product_data: { name: 'Insured Shipping' },
              unit_amount: shipping * 100,
            },
            quantity: 1,
          },
        ],
        success_url: `${process.env.VITE_APP_URL ?? 'http://localhost:3000'}/checkout/success?order=${orderNumber}`,
        cancel_url: `${process.env.VITE_APP_URL ?? 'http://localhost:3000'}/cart`,
        metadata: { orderNumber },
      })
      return { url: session.url, orderNumber }
    }

    return {
      url: `/checkout/success?order=${orderNumber}`,
      orderNumber,
      demo: true,
    }
  })

type OrderLookupInput = { orderNumber: string; email: string }

export const lookupOrder = createServerFn({ method: 'POST' })
  .validator((data: OrderLookupInput) => data)
  .handler(async ({ data }) => {
    const order = memoryStore.orders.find(
      (o) => o.orderNumber === data.orderNumber && o.email === data.email,
    )
    return order ? toOrderSummary(order) : null
  })

type KycInput = {
  orderNumber: string
  email: string
  docType: string
  fileName?: string
  fileData?: string
}

export const createKycCase = createServerFn({ method: 'POST' })
  .validator((data: KycInput) => data)
  .handler(async ({ data }) => {
    const retentionUntil = new Date()
    retentionUntil.setFullYear(retentionUntil.getFullYear() + 5)
    const kycCase = {
      id: crypto.randomUUID(),
      ...data,
      status: 'submitted',
      retentionUntil: retentionUntil.toISOString(),
      createdAt: new Date().toISOString(),
    }
    memoryStore.kycCases.push(kycCase)
    if (isSupabaseServerConfigured()) {
      const supabase = getSupabaseServiceClient()!
      const { data: inserted } = await supabase
        .from('kyc_cases')
        .insert({
          status: 'submitted',
          retention_until: retentionUntil.toISOString(),
        })
        .select('id')
        .single()

      if (inserted && data.fileData && data.fileName) {
        const buffer = Buffer.from(data.fileData, 'base64')
        const path = `${inserted.id}/${data.fileName}`
        await supabase.storage.from('kyc-documents').upload(path, buffer, {
          contentType: data.fileName.endsWith('.pdf') ? 'application/pdf' : 'image/jpeg',
          upsert: true,
        })
        await supabase.from('kyc_documents').insert({
          kyc_case_id: inserted.id,
          doc_type: data.docType,
          file_path: path,
        })
      }
    }
    return kycCase
  })

export const markOrderPaid = createServerFn({ method: 'POST' })
  .validator((orderNumber: string) => orderNumber)
  .handler(async ({ data: orderNumber }) => {
    const order = memoryStore.orders.find((o) => o.orderNumber === orderNumber)
    if (order) order.status = 'paid'
    if (isSupabaseServerConfigured()) {
      const supabase = getSupabaseServiceClient()!
      await supabase.from('orders').update({ status: 'paid' }).eq('order_number', orderNumber)
    }
    return { success: true, orderNumber }
  })

export const getOrdersForEmail = createServerFn({ method: 'POST' })
  .validator((email: string) => email)
  .handler(async ({ data: email }) =>
    memoryStore.orders
      .filter((o) => o.email === email)
      .map(toOrderSummary),
  )
