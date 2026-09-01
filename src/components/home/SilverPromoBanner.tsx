'use client'

import { links } from '@/lib/links'
import { homeCopy } from '@/data/copy'
import { MotionSection, RevealBlock, RevealText } from '@/components/motion'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/shared/primitives'

export function SilverPromoBanner() {
  return (
    <MotionSection id="silver" tier="a" className="overflow-hidden bg-emerald-deep py-12 md:py-16">
      <Container>
        <div className="grid items-center gap-8 md:grid-cols-2">
          <RevealBlock x={-40} className="relative">
            <img
              src="/coins.png"
              alt="Prime Gold Trading coins"
              className="mx-auto max-h-72 w-full object-contain drop-shadow-2xl lg:mx-0"
            />
          </RevealBlock>

          <div className="text-center lg:text-left">
            <RevealText as="h2" className="text-4xl tracking-tight text-white md:text-5xl lg:text-6xl">
              {homeCopy.silver.title}
            </RevealText>
            <RevealBlock delay={0.15} className="mt-4">
              <p className="text-base font-extralight leading-relaxed text-white/80 md:text-lg">
                {homeCopy.silver.body}
              </p>
            </RevealBlock>
            <RevealBlock delay={0.25} className="mt-6">
              <Button variant="gold" size="lg" asChild>
                <a href={links.silver}>{homeCopy.silver.cta}</a>
              </Button>
            </RevealBlock>
          </div>
        </div>
      </Container>
    </MotionSection>
  )
}
