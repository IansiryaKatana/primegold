'use client'

import { createFileRoute } from '@tanstack/react-router'
import { Container } from '@/components/shared/primitives'
import { Button } from '@/components/ui/button'
import { links } from '@/lib/links'
import { useCartStore } from '@/store/cart'
import { useEffect } from 'react'

export const Route = createFileRoute('/checkout/success')({
  component: CheckoutSuccessPage,
  validateSearch: (search: Record<string, unknown>) => ({
    order: (search.order as string) ?? '',
  }),
})

function CheckoutSuccessPage() {
  const { order } = Route.useSearch()
  const clear = useCartStore((s) => s.clear)

  useEffect(() => {
    clear()
  }, [clear])

  return (
    <section className="bg-cream py-16">
      <Container className="max-w-lg text-center">
        <h1 className="text-heading text-primary-text">Order Confirmed</h1>
        <p className="mt-4 text-muted-text">
          Thank you for your purchase. Your order number is{' '}
          <strong className="text-primary-text">{order}</strong>.
        </p>
        <p className="mt-2 text-sm text-muted-text">
          Identity verification is required before shipment. You will receive an email with next steps.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button variant="emerald" asChild>
            <a href={`${links.checkoutKyc}?order=${encodeURIComponent(order)}`}>Complete Identity Verification</a>
          </Button>
          <Button variant="outlineGold" asChild>
            <a href={links.shop}>Continue Shopping</a>
          </Button>
        </div>
      </Container>
    </section>
  )
}
