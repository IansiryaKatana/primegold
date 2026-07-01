import { createFileRoute } from '@tanstack/react-router'
import { LegalPage } from '@/components/pages/LegalPage'
import { legalCopy } from '@/data/copy'
import { metaCopy } from '@/data/copy/meta'

export const Route = createFileRoute('/terms')({
  component: TermsRoute,
})

function TermsRoute() {
  return (
    <>
      <title>{metaCopy.terms.title}</title>
      <LegalPage
        title={legalCopy.terms.title}
        lastUpdated={legalCopy.terms.lastUpdated}
        intro={legalCopy.terms.intro}
        sections={legalCopy.terms.sections}
      />
    </>
  )
}
