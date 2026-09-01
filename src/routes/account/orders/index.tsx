'use client'

import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { MotionSection, RevealBlock, StaggerGrid } from '@/components/motion'
import { AppLink } from '@/components/shared/AppLink'
import { Container } from '@/components/shared/primitives'
import { Button } from '@/components/ui/button'
import { getOrdersForEmail } from '@/server/functions'
import type { OrderSummary } from '@/lib/db/memory-store'
import { getSupabaseBrowserClient, isSupabaseConfigured } from '@/lib/supabase/client'
import { formatCurrency } from '@/lib/utils'
import { links } from '@/lib/links'
import { metaCopy } from '@/data/copy/meta'

export const Route = createFileRoute('/account/orders/')({
  component: OrdersPage,
})

function OrdersPage() {
  const [email, setEmail] = useState('')
  const [orders, setOrders] = useState<OrderSummary[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      let userEmail = ''
      if (isSupabaseConfigured()) {
        const supabase = getSupabaseBrowserClient()!
        const { data } = await supabase.auth.getUser()
        userEmail = data.user?.email ?? ''
      }
      if (!userEmail) {
        userEmail = localStorage.getItem('pgt_demo_email') ?? ''
      }
      setEmail(userEmail)
      if (userEmail) {
        const result = await getOrdersForEmail({ data: userEmail })
        setOrders(result)
      }
      setLoading(false)
    }
    load()
  }, [])

  return (
    <>
      <title>{metaCopy.account.title} — Orders</title>
      <MotionSection tier="d" className="bg-cream py-16">
        <Container>
          <RevealBlock scroll={false}>
            <h1 className="text-heading text-primary-text">Order History</h1>
          </RevealBlock>
          {loading ? (
            <p className="mt-6 text-muted-text">Loading orders…</p>
          ) : !email ? (
            <div className="surface-panel mt-6 p-6">
              <p className="text-muted-text">Sign in to view your orders.</p>
              <Button variant="emerald" className="mt-4" asChild>
                <AppLink href={links.login}>Sign In</AppLink>
              </Button>
            </div>
          ) : orders.length === 0 ? (
            <p className="mt-6 text-muted-text">No orders found for {email}.</p>
          ) : (
            <StaggerGrid className="mt-8 flex flex-col gap-4" stagger={0.06}>
              {orders.map((order) => (
                <AppLink
                  key={order.orderNumber}
                  href={`${links.accountOrders}/${order.orderNumber}`}
                  className="surface-interactive block p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-primary-text">{order.orderNumber}</span>
                    <span className="text-gold">{formatCurrency(order.total)}</span>
                    <span className="text-sm capitalize text-muted-text">{order.status}</span>
                  </div>
                </AppLink>
              ))}
            </StaggerGrid>
          )}
          <Button variant="outlineGold" className="mt-8" asChild>
            <AppLink href={links.account}>Back to Account</AppLink>
          </Button>
        </Container>
      </MotionSection>
    </>
  )
}
