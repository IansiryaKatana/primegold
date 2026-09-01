'use client'

import { createFileRoute } from '@tanstack/react-router'
import { MotionSection, RevealBlock } from '@/components/motion'
import { AppLink } from '@/components/shared/AppLink'
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
    <MotionSection tier="d" className="bg-cream py-16">
      <Container className="max-w-lg text-center">
        <RevealBlock scroll={false}>
          <h1 className="text-heading text-primary-text">Order Confirmed</h1>
          <p className="mt-4 text-muted-text">
            Thank you for your purchase. Your order number is{' '}
            <strong className="text-primary-text">{order}</strong>.
          </p>
          <p className="mt-2 text-sm text-muted-text">
            Identity verification is required before shipment. You will receive an email with next steps.
          </p>
        </RevealBlock>
        <RevealBlock scroll={false} delay={0.2} className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button variant="emerald" asChild>
            <AppLink href={`${links.checkoutKyc}?order=${encodeURIComponent(order)}`}>Complete Identity Verification</AppLink>
          </Button>
          <Button variant="outlineGold" asChild>
            <AppLink href={links.shop}>Continue Shopping</AppLink>
          </Button>
        </RevealBlock>
      </Container>
    </MotionSection>
  )
}
