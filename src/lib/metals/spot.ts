import type { Product } from '@/lib/types'
import { weightToGrams } from '@/lib/utils'
import { getSupabaseServiceClient, isSupabaseServerConfigured } from '@/lib/supabase/server'

export const TROY_OZ_GRAMS = 31.1035

export const FALLBACK_GOLD_SPOT = 2345.5
export const FALLBACK_SILVER_SPOT = 28.75

export type SpotPriceSource = 'live' | 'snapshot' | 'fallback'

export type SpotPrices = {
  goldPrice: number
  silverPrice: number
  goldChangePct: number | null
  silverChangePct: number | null
  updatedAt: string
  source: SpotPriceSource
}

type MetalsLatestResponse = {
  status: string
  metals?: {
    gold?: number
    silver?: number
  }
  timestamp?: string
}


let memoryCache: { data: SpotPrices; expiresAt: number } | null = null

function getCacheTtlMs() {
  const seconds = Number(process.env.METALS_PRICE_CACHE_TTL_SECONDS ?? 3600)
  return Math.max(60, Number.isFinite(seconds) ? seconds : 3600) * 1000
}

function toSpotPrice(minor: number) {
  return Math.round(minor) / 100
}

function toSpotMinor(price: number) {
  return Math.round(price * 100)
}

function computeChangePct(current: number, previous: number | null) {
  if (previous == null || previous === 0) return null
  return Math.round(((current - previous) / previous) * 10000) / 100
}

async function fetchFromMetalsDev(): Promise<{
  gold: number
  silver: number
  timestamp: string
} | null> {
  const apiKey = process.env.METALS_API_KEY
  if (!apiKey) return null

  const url = new URL('https://api.metals.dev/v1/latest')
  url.searchParams.set('api_key', apiKey)
  url.searchParams.set('currency', 'USD')
  url.searchParams.set('unit', 'toz')

  try {
    const response = await fetch(url, {
      headers: { Accept: 'application/json' },
    })
    if (!response.ok) return null

    const json = (await response.json()) as MetalsLatestResponse
    if (json.status !== 'success' || !json.metals?.gold || !json.metals?.silver) {
      return null
    }

    return {
      gold: json.metals.gold,
      silver: json.metals.silver,
      timestamp: json.timestamp ?? new Date().toISOString(),
    }
  } catch {
    return null
  }
}

async function readLatestSnapshots(): Promise<{
  gold: number | null
  silver: number | null
  previousGold: number | null
  previousSilver: number | null
  updatedAt: string | null
}> {
  if (!isSupabaseServerConfigured()) {
    return {
      gold: null,
      silver: null,
      previousGold: null,
      previousSilver: null,
      updatedAt: null,
    }
  }

  const supabase = getSupabaseServiceClient()!
  const [goldResult, silverResult] = await Promise.all([
    supabase
      .from('price_snapshots')
      .select('spot_minor, captured_at')
      .eq('metal', 'gold')
      .order('captured_at', { ascending: false })
      .limit(2),
    supabase
      .from('price_snapshots')
      .select('spot_minor, captured_at')
      .eq('metal', 'silver')
      .order('captured_at', { ascending: false })
      .limit(2),
  ])

  const goldRows = goldResult.data ?? []
  const silverRows = silverResult.data ?? []

  return {
    gold: goldRows[0] ? toSpotPrice(goldRows[0].spot_minor) : null,
    silver: silverRows[0] ? toSpotPrice(silverRows[0].spot_minor) : null,
    previousGold: goldRows[1] ? toSpotPrice(goldRows[1].spot_minor) : null,
    previousSilver: silverRows[1] ? toSpotPrice(silverRows[1].spot_minor) : null,
    updatedAt: goldRows[0]?.captured_at ?? silverRows[0]?.captured_at ?? null,
  }
}

async function persistSnapshots(gold: number, silver: number) {
  if (!isSupabaseServerConfigured()) return

  const supabase = getSupabaseServiceClient()!
  const capturedAt = new Date().toISOString()

  await supabase.from('price_snapshots').insert([
    {
      metal: 'gold',
      currency: 'USD',
      spot_minor: toSpotMinor(gold),
      captured_at: capturedAt,
    },
    {
      metal: 'silver',
      currency: 'USD',
      spot_minor: toSpotMinor(silver),
      captured_at: capturedAt,
    },
  ])
}

function buildSpotPrices(
  goldPrice: number,
  silverPrice: number,
  previousGold: number | null,
  previousSilver: number | null,
  updatedAt: string,
  source: SpotPriceSource,
): SpotPrices {
  return {
    goldPrice,
    silverPrice,
    goldChangePct: computeChangePct(goldPrice, previousGold),
    silverChangePct: computeChangePct(silverPrice, previousSilver),
    updatedAt,
    source,
  }
}

export async function getSpotPrices(): Promise<SpotPrices> {
  const now = Date.now()
  if (memoryCache && memoryCache.expiresAt > now) {
    return memoryCache.data
  }

  const previous = await readLatestSnapshots()

  const live = await fetchFromMetalsDev()
  if (live) {
    await persistSnapshots(live.gold, live.silver)
    const data = buildSpotPrices(
      live.gold,
      live.silver,
      previous.gold,
      previous.silver,
      live.timestamp,
      'live',
    )
    memoryCache = { data, expiresAt: now + getCacheTtlMs() }
    return data
  }

  if (previous.gold != null && previous.silver != null) {
    const data = buildSpotPrices(
      previous.gold,
      previous.silver,
      previous.previousGold,
      previous.previousSilver,
      previous.updatedAt ?? new Date().toISOString(),
      'snapshot',
    )
    memoryCache = { data, expiresAt: now + getCacheTtlMs() }
    return data
  }

  const data = buildSpotPrices(
    FALLBACK_GOLD_SPOT,
    FALLBACK_SILVER_SPOT,
    null,
    null,
    new Date().toISOString(),
    'fallback',
  )
  memoryCache = { data, expiresAt: now + getCacheTtlMs() }
  return data
}

export function pricePerGram(spotPerOz: number) {
  return spotPerOz / TROY_OZ_GRAMS
}

export async function priceProducts(products: Product[]) {
  const spots = await getSpotPrices()
  const goldPerGram = pricePerGram(spots.goldPrice)
  const silverPerGram = pricePerGram(spots.silverPrice)

  return products.map((product) => {
    const grams = weightToGrams(product.weight)
    const rate = product.metalType === 'silver' ? silverPerGram : goldPerGram
    const multiplier = product.metalType === 'silver' ? 1.08 : 1.05
    return {
      ...product,
      price: Math.round(rate * grams * multiplier * 100) / 100,
    }
  })
}
