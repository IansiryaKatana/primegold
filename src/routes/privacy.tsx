import { createFileRoute } from '@tanstack/react-router'
import { LegalPage } from '@/components/pages/LegalPage'
import { legalCopy } from '@/data/copy'
import { metaCopy } from '@/data/copy/meta'

export const Route = createFileRoute('/privacy')({
  component: PrivacyRoute,
})

function PrivacyRoute() {
  return (
    <>
      <title>{metaCopy.privacy.title}</title>
      <LegalPage
        title={legalCopy.privacy.title}
        lastUpdated={legalCopy.privacy.lastUpdated}
        intro={legalCopy.privacy.intro}
        sections={legalCopy.privacy.sections}
      />
    </>
  )
}
