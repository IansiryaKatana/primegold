import { createFileRoute } from '@tanstack/react-router'
import Stripe from 'stripe'
import { markOrderPaid } from '@/server/functions'

export const Route = createFileRoute('/api/stripe-webhook')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env.STRIPE_WEBHOOK_SECRET
        const stripeKey = process.env.STRIPE_SECRET_KEY

        if (!secret || !stripeKey) {
          return new Response(JSON.stringify({ received: true, demo: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          })
        }

        const stripe = new Stripe(stripeKey)
        const body = await request.text()
        const sig = request.headers.get('stripe-signature')

        if (!sig) {
          return new Response('Missing signature', { status: 400 })
        }

        let event: Stripe.Event
        try {
          event = stripe.webhooks.constructEvent(body, sig, secret)
        } catch (err) {
          return new Response(`Webhook Error: ${(err as Error).message}`, { status: 400 })
        }

        if (event.type === 'checkout.session.completed') {
          const session = event.data.object as Stripe.Checkout.Session
          const orderNumber = session.metadata?.orderNumber
          if (orderNumber) {
            await markOrderPaid({ data: orderNumber })
          }
        }

        return new Response(JSON.stringify({ received: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      },
    },
  },
})
