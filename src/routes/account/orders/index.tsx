'use client'

import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Container } from '@/components/shared/primitives'
import { Button } from '@/components/ui/button'
import { getOrdersForEmail } from '@/server/functions'
import { getSupabaseBrowserClient, isSupabaseConfigured } from '@/lib/supabase/client'
import { formatCurrency } from '@/lib/utils'
import { links } from '@/lib/links'
import { metaCopy } from '@/data/copy/meta'

export const Route = createFileRoute('/account/orders/')({
  component: OrdersPage,
})

function OrdersPage() {
  const [email, setEmail] = useState('')
  const [orders, setOrders] = useState<Array<Record<string, unknown>>>([])
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
        setOrders(result as Array<Record<string, unknown>>)
      }
      setLoading(false)
    }
    load()
  }, [])

  return (
    <>
      <title>{metaCopy.account.title} — Orders</title>
      <section className="bg-cream py-16">
        <Container>
          <h1 className="text-heading text-primary-text">Order History</h1>
          {loading ? (
            <p className="mt-6 text-muted-text">Loading orders…</p>
          ) : !email ? (
            <div className="mt-6 rounded-sm border border-warm-border bg-white p-6">
              <p className="text-muted-text">Sign in to view your orders.</p>
              <Button variant="emerald" className="mt-4" asChild>
                <a href={links.login}>Sign In</a>
              </Button>
            </div>
          ) : orders.length === 0 ? (
            <p className="mt-6 text-muted-text">No orders found for {email}.</p>
          ) : (
            <div className="mt-8 flex flex-col gap-4">
              {orders.map((order) => (
                <a
                  key={String(order.orderNumber)}
                  href={`${links.accountOrders}/${order.orderNumber}`}
                  className="rounded-sm border border-warm-border bg-white p-4 hover:shadow-md"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-primary-text">{String(order.orderNumber)}</span>
                    <span className="text-gold">{formatCurrency(Number(order.total))}</span>
                    <span className="text-sm capitalize text-muted-text">{String(order.status)}</span>
                  </div>
                </a>
              ))}
            </div>
          )}
          <Button variant="outlineGold" className="mt-8" asChild>
            <a href={links.account}>Back to Account</a>
          </Button>
        </Container>
      </section>
    </>
  )
}
