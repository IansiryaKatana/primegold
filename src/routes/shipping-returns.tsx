import { createFileRoute } from '@tanstack/react-router'
import { LegalPage } from '@/components/pages/LegalPage'
import { legalCopy } from '@/data/copy'
import { metaCopy } from '@/data/copy/meta'

export const Route = createFileRoute('/shipping-returns')({
  component: ShippingPage,
})

function ShippingPage() {
  return (
    <>
      <title>{metaCopy.shipping.title}</title>
      <LegalPage title={legalCopy.shipping.title} sections={legalCopy.shipping.sections} />
    </>
  )
}
