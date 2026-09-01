'use client'

import { sellCopy } from '@/data/copy'
import { links } from '@/lib/links'
import { MotionSection, RevealText, StaggerGrid } from '@/components/motion'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/shared/primitives'
import { PageHero } from '@/components/pages/PageHero'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { metaCopy } from '@/data/copy/meta'
import { Check, X } from 'lucide-react'

export function SellPageContent() {
  return (
    <>
      <title>{metaCopy.sell.title}</title>
      <meta name="description" content={metaCopy.sell.description} />
      <PageHero
        title={sellCopy.title}
        subtitle={sellCopy.subtitle}
        crumbs={[
          { label: 'Home', href: links.home },
          { label: 'Sell' },
        ]}
      >
        <Button variant="gold" asChild>
          <a href={links.estimate}>{sellCopy.estimateCta}</a>
        </Button>
        <Button variant="outlineGold" asChild>
          <a href={links.locations}>{sellCopy.appointmentCta}</a>
        </Button>
      </PageHero>

      <MotionSection tier="b" className="bg-white py-16 md:py-20">
        <Container>
          <RevealText as="h2" className="text-center text-2xl text-primary-text md:text-3xl">
            {sellCopy.process.title}
          </RevealText>
          <StaggerGrid className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
            {sellCopy.process.steps.map((step, i) => (
              <div
                key={step.title}
                className="rounded-sm border border-warm-border p-6"
              >
                <span className="text-sm font-normal text-gold">Step {i + 1}</span>
                <h3 className="mt-2 text-lg text-primary-text">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-text md:text-base">{step.description}</p>
              </div>
            ))}
          </StaggerGrid>
        </Container>
      </MotionSection>

      <MotionSection tier="d" className="bg-cream py-16 md:py-20">
        <Container>
          <Tabs defaultValue="accepted" className="w-full">
            <TabsList className="mx-auto max-w-md">
              <TabsTrigger value="accepted">{sellCopy.acceptedTitle}</TabsTrigger>
              <TabsTrigger value="rejected">{sellCopy.rejectedTitle}</TabsTrigger>
            </TabsList>
            <TabsContent value="accepted">
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {sellCopy.accepted.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 rounded-sm border border-warm-border bg-white px-4 py-3 text-sm text-primary-text md:text-base"
                  >
                    <Check className="size-4 shrink-0 text-gold" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="rejected">
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {sellCopy.rejected.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 rounded-sm border border-warm-border bg-white px-4 py-3 text-sm text-muted-text md:text-base"
                  >
                    <X className="size-4 shrink-0 text-warm-border" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
          <p className="mt-8 text-center text-sm text-muted-text">{sellCopy.disclaimer}</p>
        </Container>
      </MotionSection>
    </>
  )
}
