'use client'

import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { MotionSection, RevealBlock } from '@/components/motion'
import { Container } from '@/components/shared/primitives'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { lookupOrder } from '@/server/functions'
import type { OrderSummary } from '@/lib/db/memory-store'
import { formatCurrency } from '@/lib/utils'
import { metaCopy } from '@/data/copy/meta'

export const Route = createFileRoute('/order-lookup')({
  component: OrderLookupPage,
})

function OrderLookupPage() {
  const [orderNumber, setOrderNumber] = useState('')
  const [email, setEmail] = useState('')
  const [order, setOrder] = useState<OrderSummary | null>(null)
  const [notFound, setNotFound] = useState(false)

  async function handleLookup(e: React.FormEvent) {
    e.preventDefault()
    const result = await lookupOrder({ data: { orderNumber, email } })
    setOrder(result)
    setNotFound(!result)
  }

  return (
    <>
      <title>{metaCopy.orderLookup.title}</title>
      <MotionSection tier="d" className="bg-cream py-16">
        <Container className="max-w-md">
          <RevealBlock scroll={false}>
            <h1 className="text-heading text-primary-text">Order Lookup</h1>
          </RevealBlock>
          <form onSubmit={handleLookup} className="mt-8 flex flex-col gap-4 rounded-sm border border-warm-border bg-white p-6">
            <div><Label htmlFor="order">Order Number</Label><Input id="order" required value={orderNumber} onChange={(e) => setOrderNumber(e.target.value)} /></div>
            <div><Label htmlFor="email">Email</Label><Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></div>
            <Button type="submit" variant="emerald">Look Up Order</Button>
          </form>
          {order && (
            <div className="mt-6 rounded-sm border border-warm-border bg-white p-6">
              <p className="text-sm text-muted-text">Order {order.orderNumber}</p>
              <p className="mt-2 text-lg text-gold">{formatCurrency(order.total)}</p>
              <p className="mt-1 text-sm">Status: {order.status}</p>
            </div>
          )}
          {notFound && !order && <p className="mt-4 text-sm text-red-600">No order found.</p>}
        </Container>
      </MotionSection>
    </>
  )
}
