'use client'

import { aboutCopy, brand } from '@/data/copy'
import { links } from '@/lib/links'
import { MotionSection, RevealBlock, RevealText, StaggerGrid } from '@/components/motion'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/shared/primitives'
import { PageHero } from '@/components/pages/PageHero'
import { metaCopy } from '@/data/copy/meta'

export function AboutPageContent() {
  return (
    <>
      <title>{metaCopy.about.title}</title>
      <meta name="description" content={metaCopy.about.description} />
      <PageHero
        title={aboutCopy.title}
        subtitle={aboutCopy.subtitle}
        crumbs={[
          { label: 'Home', href: links.home },
          { label: 'About' },
        ]}
      />
      <MotionSection tier="b" className="bg-white py-16 md:py-20">
        <Container className="max-w-3xl">
          <RevealText as="h2" className="text-2xl text-primary-text md:text-3xl">
            {aboutCopy.story.heading}
          </RevealText>
          <RevealBlock className="mt-4">
            <p className="text-desc">{aboutCopy.story.body}</p>
          </RevealBlock>
          <RevealBlock delay={0.1} className="mt-4">
            <p className="text-desc">{brand.trustLine}</p>
          </RevealBlock>
        </Container>
      </MotionSection>
      <MotionSection tier="b" className="bg-cream py-14">
        <Container>
          <StaggerGrid className="grid grid-cols-2 gap-6 md:grid-cols-4" stagger={0.1}>
            {aboutCopy.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl text-gold md:text-4xl">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-text md:text-base">{stat.label}</p>
              </div>
            ))}
          </StaggerGrid>
        </Container>
      </MotionSection>
      <MotionSection tier="b" className="bg-white py-16 md:py-20">
        <Container>
          <RevealText as="h2" className="text-center text-2xl text-primary-text md:text-3xl">
            What We Stand For
          </RevealText>
          <StaggerGrid className="mt-10 grid gap-6 sm:grid-cols-2" stagger={0.1}>
            {aboutCopy.values.map((value) => (
              <div
                key={value.title}
                className="rounded-sm border border-warm-border p-6"
              >
                <h3 className="text-lg text-primary-text">{value.title}</h3>
                <p className="mt-2 text-desc">{value.description}</p>
              </div>
            ))}
          </StaggerGrid>
        </Container>
      </MotionSection>
      <MotionSection tier="b" className="bg-emerald-deep py-14">
        <Container className="flex flex-col items-center text-center">
          <RevealText as="h2" className="text-2xl text-white md:text-3xl">
            {aboutCopy.cta.title}
          </RevealText>
          <RevealBlock className="mt-3 max-w-lg">
            <p className="text-white/80">{aboutCopy.cta.body}</p>
          </RevealBlock>
          <RevealBlock className="mt-6 flex flex-wrap justify-center gap-3">
            <Button variant="gold" asChild>
              <a href={links.locations}>{aboutCopy.cta.primary}</a>
            </Button>
            <Button variant="outlineGold" asChild>
              <a href={links.shop}>{aboutCopy.cta.secondary}</a>
            </Button>
          </RevealBlock>
        </Container>
      </MotionSection>
    </>
  )
}
