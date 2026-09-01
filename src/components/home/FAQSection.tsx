'use client'

import type { FAQ } from '@/lib/types'
import { AppLink } from '@/components/shared/AppLink'
import { links } from '@/lib/links'
import { homeCopy } from '@/data/copy'
import { MotionSection, RevealBlock, StaggerGrid } from '@/components/motion'
import { Button } from '@/components/ui/button'
import { Container, SectionHeading } from '@/components/shared/primitives'
import { FaqAccordion } from '@/components/pages/FaqAccordion'

type FAQSectionProps = {
  faqs: readonly FAQ[]
}

export function FAQSection({ faqs }: FAQSectionProps) {
  return (
    <MotionSection id="faq" tier="b" className="bg-white py-16 md:py-20">
      <Container>
        <SectionHeading title={homeCopy.faq.title} />
        <StaggerGrid stagger={0.08} childSelector=".faq-accordion-item">
          <FaqAccordion faqs={faqs} columns={2} />
        </StaggerGrid>
        <RevealBlock className="mt-8 flex justify-center">
          <Button variant="outlineGold" asChild>
            <AppLink href={links.faq}>{homeCopy.faq.viewAll}</AppLink>
          </Button>
        </RevealBlock>
      </Container>
    </MotionSection>
  )
}
