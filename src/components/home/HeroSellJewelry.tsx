'use client'

import { useRef } from 'react'
import { Flag, Lock, MapPin } from 'lucide-react'
import { links } from '@/lib/links'
import { homeCopy } from '@/data/copy'
import { ParallaxBg, RevealBlock, StaggerGrid } from '@/components/motion'
import { useGSAP, gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/shared/primitives'

export function HeroSellJewelry() {
  const imgWrapRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const copy = homeCopy.hero

  useGSAP(
    () => {
      const img = imgWrapRef.current?.querySelector('img')
      if (!img) return
      if (reduced) {
        gsap.set(img, { opacity: 1, y: 0 })
        return
      }
      gsap.set(img, { opacity: 0, y: 30 })
      gsap.to(img, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2,
      })
    },
    { scope: imgWrapRef, dependencies: [reduced] },
  )

  return (
    <section className="relative flex overflow-hidden bg-emerald-dark py-12 md:h-[calc(100svh-var(--site-chrome-height,7rem))] md:items-center md:py-0">
      <ParallaxBg
        kenBurns
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: 'url(/bg.png)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-dark via-emerald-dark/90 to-emerald-dark/60" />

      <Container className="relative flex h-full w-full items-center py-10 md:py-8 lg:py-10">
        <div className="grid w-full items-center gap-6 md:grid-cols-2 md:gap-10 lg:gap-14">
          <div
            ref={imgWrapRef}
            className="relative hidden md:flex md:max-h-full md:items-center md:justify-center"
          >
            <img
              src="/product-images/prime-gold-merch-1.png"
              alt="Prime Gold Trading bullion bars"
              className="mx-auto h-auto max-h-[min(32rem,calc(100svh-var(--site-chrome-height,7rem)-6rem))] w-auto max-w-full object-contain drop-shadow-2xl"
            />
          </div>

          <div className="flex flex-col items-center justify-center text-center lg:items-start lg:text-left">
            {/* Fade reveal only — SplitText was collapsing heading line boxes to ~20px */}
            <RevealBlock scroll={false}>
              <h1 className="text-[1.75rem] font-normal leading-snug tracking-tight text-white sm:text-4xl md:text-[2.5rem] md:leading-snug lg:text-5xl lg:leading-[1.2]">
                <span className="block">{copy.headline}</span>
                <span className="mt-1 block text-gold">{copy.promo}</span>
              </h1>
            </RevealBlock>
            <RevealBlock scroll={false} delay={0.15} className="mt-4 max-w-lg">
              <p className="text-desc text-white/80">{copy.subheadline}</p>
            </RevealBlock>
            <RevealBlock
              scroll={false}
              delay={0.25}
              className="mt-6 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap md:mt-8"
            >
              <Button variant="gold" size="lg" asChild>
                <a href={links.locations}>{copy.cta}</a>
              </Button>
              <Button variant="outlineGold" size="lg" asChild>
                <a href={links.shop}>{copy.ctaSecondary}</a>
              </Button>
            </RevealBlock>
            <StaggerGrid
              className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center md:mt-6 lg:justify-start"
              stagger={0.08}
            >
              {copy.trustBullets.map((bullet, i) => (
                <span
                  key={bullet}
                  className="flex items-center gap-1.5 text-sm text-white/80 md:text-base"
                >
                  {[Lock, MapPin, Flag][i] && (
                    <span className="text-gold">
                      {i === 0 && <Lock className="size-3.5" />}
                      {i === 1 && <MapPin className="size-3.5" />}
                      {i === 2 && <Flag className="size-3.5" />}
                    </span>
                  )}
                  {bullet}
                </span>
              ))}
            </StaggerGrid>
          </div>
        </div>
      </Container>
    </section>
  )
}
