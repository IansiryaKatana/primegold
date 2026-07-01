import type { FAQ } from '@/lib/types'
import { links } from '@/lib/links'
import { homeCopy } from '@/data/copy'
import { Button } from '@/components/ui/button'
import { Container, SectionHeading } from '@/components/shared/primitives'
import { FaqAccordion } from '@/components/pages/FaqAccordion'

type FAQSectionProps = {
  faqs: FAQ[]
}

export function FAQSection({ faqs }: FAQSectionProps) {
  return (
    <section id="faq" className="bg-white py-16 md:py-20">
      <Container>
        <SectionHeading title={homeCopy.faq.title} />
        <FaqAccordion faqs={faqs} columns={2} />
        <div className="mt-8 flex justify-center">
          <Button variant="outlineGold" asChild>
            <a href={links.faq}>{homeCopy.faq.viewAll}</a>
          </Button>
        </div>
      </Container>
    </section>
  )
}
