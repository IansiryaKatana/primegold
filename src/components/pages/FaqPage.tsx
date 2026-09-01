'use client'

import { faqCopy, faqPageCopy } from '@/data/copy'
import { links } from '@/lib/links'
import { MotionSection, RevealBlock, RevealText, StaggerGrid } from '@/components/motion'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/shared/primitives'
import { PageHero } from '@/components/pages/PageHero'
import { FaqAccordion } from '@/components/pages/FaqAccordion'
import { metaCopy } from '@/data/copy/meta'

export function FaqPage() {
  return (
    <>
      <title>{metaCopy.faq.title}</title>
      <meta name="description" content={metaCopy.faq.description} />
      <PageHero
        title={faqPageCopy.title}
        subtitle={faqPageCopy.subtitle}
        crumbs={[
          { label: 'Home', href: links.home },
          { label: 'FAQ' },
        ]}
      />
      <MotionSection tier="b" className="bg-white py-16 md:py-20">
        <Container>
          <StaggerGrid className="flex flex-col gap-14" stagger={0.12}>
            {faqPageCopy.categories.map((category) => {
              const items = faqCopy.filter((f) => f.category === category.id)
              return (
                <div key={category.id}>
                  <h2 className="text-2xl text-primary-text md:text-3xl">{category.title}</h2>
                  <p className="mt-2 max-w-2xl text-desc">{category.description}</p>
                  <div className="mt-6">
                    <FaqAccordion faqs={[...items]} />
                  </div>
                </div>
              )
            })}
          </StaggerGrid>
        </Container>
      </MotionSection>
      <MotionSection tier="b" className="border-t border-warm-border bg-cream py-14">
        <Container className="flex flex-col items-center text-center">
          <RevealText as="h2" className="text-2xl text-primary-text md:text-3xl">
            {faqPageCopy.cta.title}
          </RevealText>
          <RevealBlock className="mt-3 max-w-lg">
            <p className="text-desc">{faqPageCopy.cta.body}</p>
          </RevealBlock>
          <RevealBlock className="mt-6 flex flex-wrap justify-center gap-3">
            <Button variant="emerald" asChild>
              <a href={links.contact}>{faqPageCopy.cta.primary}</a>
            </Button>
            <Button variant="outlineGold" asChild>
              <a href={links.locations}>{faqPageCopy.cta.secondary}</a>
            </Button>
          </RevealBlock>
        </Container>
      </MotionSection>
    </>
  )
}
