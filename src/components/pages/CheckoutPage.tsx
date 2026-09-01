'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { MotionSection, RevealBlock } from '@/components/motion'
import { Container } from '@/components/shared/primitives'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { CartLineItem } from '@/components/cart/CartLineItem'
import { CartSummary } from '@/components/cart/CartSummary'
import { useCartStore } from '@/store/cart'
import { createCheckoutSession } from '@/server/functions'
import { links } from '@/lib/links'
import { metaCopy } from '@/data/copy/meta'
import { ChevronLeft, CreditCard } from 'lucide-react'

const checkoutSchema = z.object({
  name: z.string().min(2, 'Full name is required'),
  email: z.string().email('Valid email is required'),
})

type CheckoutFormValues = z.infer<typeof checkoutSchema>

export function CheckoutPage() {
  const lines = useCartStore((s) => s.lines)
  const updateQty = useCartStore((s) => s.updateQty)
  const removeItem = useCartStore((s) => s.removeItem)
  const total = useCartStore((s) => s.total)
  const count = useCartStore((s) => s.count)
  const [shipping, setShipping] = useState<'standard' | 'premium'>('standard')
  const [loading, setLoading] = useState(false)

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: '',
      email: typeof window !== 'undefined' ? localStorage.getItem('pgt_demo_email') ?? '' : '',
    },
  })

  async function onSubmit(values: CheckoutFormValues) {
    if (lines.length === 0) {
      toast.error('Your cart is empty.')
      return
    }
    setLoading(true)
    try {
      const result = await createCheckoutSession({
        data: {
          lines: lines.map((l) => ({
            productId: l.productId,
            name: l.name,
            price: l.price,
            qty: l.qty,
          })),
          email: values.email,
          name: values.name,
          shippingMethod: shipping,
        },
      })
      if (result.url) {
        localStorage.setItem('pgt_demo_email', values.email)
        window.location.href = result.url
      }
    } catch {
      toast.error('Checkout failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (lines.length === 0) {
    return (
      <>
        <title>{metaCopy.checkout.title}</title>
        <MotionSection tier="d" className="bg-cream py-16">
          <Container className="max-w-lg text-center">
            <h1 className="text-heading text-primary-text">Checkout</h1>
            <p className="mt-4 text-muted-text">Your cart is empty. Add products before checking out.</p>
            <Button variant="emerald" className="mt-6" asChild>
              <a href={links.shop}>Browse Products</a>
            </Button>
          </Container>
        </MotionSection>
      </>
    )
  }

  return (
    <>
      <title>{metaCopy.checkout.title}</title>
      <meta name="description" content={metaCopy.checkout.description} />
      <MotionSection tier="d" className="bg-cream py-10 md:py-14">
        <Container>
          <RevealBlock scroll={false}>
          <Button variant="ghost" className="mb-6 -ml-2 text-emerald-deep" asChild>
            <a href={links.cart}>
              <ChevronLeft className="size-4" />
              Back to cart
            </a>
          </Button>

          <h1 className="text-heading text-primary-text">Checkout</h1>
          <p className="mt-1 text-sm text-muted-text">
            Secure payment · Identity verification required before shipment
          </p>
          </RevealBlock>

          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            <div className="flex flex-col gap-6 lg:col-span-2">
              <Card className="border-warm-border">
                <CardHeader>
                  <CardTitle className="text-lg">Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full name</FormLabel>
                            <FormControl>
                              <Input placeholder="Jane Smith" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="you@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                </CardContent>
              </Card>

              <Card className="border-warm-border">
                <CardHeader>
                  <CardTitle className="text-lg">Order Items</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  {lines.map((line) => (
                    <CartLineItem
                      key={line.productId}
                      line={line}
                      onUpdateQty={updateQty}
                      onRemove={removeItem}
                      compact
                    />
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col gap-4">
              <CartSummary
                subtotal={total()}
                shipping={shipping}
                onShippingChange={setShipping}
                showShippingSelect
                itemCount={count()}
                ctaLabel="Pay Securely"
                loading={loading}
                onCheckout={form.handleSubmit(onSubmit)}
              />
              <div className="flex items-center justify-center gap-2 text-xs text-muted-text">
                <CreditCard className="size-4" />
                <span>Powered by Stripe · PCI compliant</span>
              </div>
            </div>
          </div>
        </Container>
      </MotionSection>
    </>
  )
}
