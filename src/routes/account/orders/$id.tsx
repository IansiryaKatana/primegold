'use client'

import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { MotionSection, RevealBlock } from '@/components/motion'
import { Container } from '@/components/shared/primitives'
import { Button } from '@/components/ui/button'
import { lookupOrder } from '@/server/functions'
import type { OrderSummary } from '@/lib/db/memory-store'
import { formatCurrency } from '@/lib/utils'
import { links } from '@/lib/links'

export const Route = createFileRoute('/account/orders/$id')({
  component: OrderDetailPage,
})

function OrderDetailPage() {
  const { id: orderId } = Route.useParams()
  const [order, setOrder] = useState<OrderSummary | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const email = localStorage.getItem('pgt_demo_email') ?? ''
      if (email) {
        const result = await lookupOrder({ data: { orderNumber: orderId, email } })
        setOrder(result)
      }
      setLoading(false)
    }
    load()
  }, [orderId])

  if (loading) {
    return (
      <section className="bg-cream py-16">
        <Container><p>Loading…</p></Container>
      </section>
    )
  }

  if (!order) {
    return (
      <section className="bg-cream py-16">
        <Container>
          <h1 className="text-heading text-primary-text">Order Not Found</h1>
          <Button variant="emerald" className="mt-4" asChild>
            <a href={links.orderLookup}>Look Up Order</a>
          </Button>
        </Container>
      </section>
    )
  }

  return (
    <MotionSection tier="d" className="bg-cream py-16">
      <Container className="max-w-2xl">
        <RevealBlock scroll={false}>
          <h1 className="text-heading text-primary-text">Order {order.orderNumber}</h1>
          <p className="mt-2 text-sm text-muted-text">Status: {order.status}</p>
        </RevealBlock>
        <ul className="mt-6 space-y-3 rounded-sm border border-warm-border bg-white p-6">
          {order.lines.map((line) => (
            <li key={line.name} className="flex justify-between text-sm">
              <span>{line.name} × {line.qty}</span>
              <span>{formatCurrency(line.price * line.qty)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between text-base">
          <span>Total</span>
          <span className="text-gold">{formatCurrency(order.total)}</span>
        </div>
        <Button variant="outlineGold" className="mt-8" asChild>
          <a href={links.accountOrders}>Back to Orders</a>
        </Button>
      </Container>
    </MotionSection>
  )
}
