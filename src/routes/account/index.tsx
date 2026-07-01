import { createFileRoute } from '@tanstack/react-router'
import { Container } from '@/components/shared/primitives'
import { Button } from '@/components/ui/button'
import { links } from '@/lib/links'
import { metaCopy } from '@/data/copy/meta'

export const Route = createFileRoute('/account/')({
  component: AccountPage,
})

function AccountPage() {
  return (
    <>
      <title>{metaCopy.account.title}</title>
      <section className="bg-cream py-16">
        <Container className="max-w-2xl">
          <h1 className="text-heading text-primary-text">My Account</h1>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <a href={links.accountOrders} className="rounded-sm border border-warm-border bg-white p-6 hover:shadow-md">
              <h2 className="text-lg text-primary-text">Order History</h2>
              <p className="mt-1 text-sm text-muted-text">View past orders and track shipments.</p>
            </a>
            <a href={links.checkoutKyc} className="rounded-sm border border-warm-border bg-white p-6 hover:shadow-md">
              <h2 className="text-lg text-primary-text">Identity Verification</h2>
              <p className="mt-1 text-sm text-muted-text">Complete or check KYC status.</p>
            </a>
            <a href={links.orderLookup} className="rounded-sm border border-warm-border bg-white p-6 hover:shadow-md">
              <h2 className="text-lg text-primary-text">Order Lookup</h2>
              <p className="mt-1 text-sm text-muted-text">Find an order by number and email.</p>
            </a>
          </div>
          <Button variant="outlineGold" className="mt-8" asChild>
            <a href={links.login}>Sign In</a>
          </Button>
        </Container>
      </section>
    </>
  )
}
