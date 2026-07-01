'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Flag, Lock, MapPin } from 'lucide-react'
import { links } from '@/lib/links'
import { homeCopy } from '@/data/copy'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/shared/primitives'
import { gsap, registerGsapPlugins } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function HeroSellJewelry() {
  const bgRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const reduced = useReducedMotion()
  const copy = homeCopy.hero

  useEffect(() => {
    if (reduced) return
    registerGsapPlugins()
    const ctx = gsap.context(() => {
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          scale: 1.08,
          duration: 20,
          repeat: -1,
          yoyo: true,
          ease: 'none',
        })
      }
      if (imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 },
        )
      }
    })
    return () => ctx.revert()
  }, [reduced])

  return (
    <section className="relative min-h-0 overflow-hidden bg-emerald-dark py-12 md:min-h-[480px] md:py-16 lg:min-h-[540px]">
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: 'url(/bg.png)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-dark via-emerald-dark/90 to-emerald-dark/60" />

      <Container className="relative flex min-h-0 items-center py-12 md:min-h-[480px] lg:min-h-[540px]">
        <div className="grid w-full gap-8 md:grid-cols-2 md:items-center lg:items-stretch">
          <div className="relative hidden md:flex md:items-center md:justify-center">
            <img
              ref={imgRef}
              src="/product-images/prime-gold-merch-1.png"
              alt="Prime Gold Trading bullion bars"
              className="max-h-64 w-full rounded-sm object-contain drop-shadow-2xl lg:max-h-none lg:h-full"
            />
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex h-full flex-col items-center justify-center text-center lg:items-start lg:text-left"
          >
            <motion.h1 variants={fadeUp} className="text-heading-lg leading-tight text-white">
              {copy.headline}{' '}
              <span className="text-gold">{copy.promo}</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-4 max-w-lg text-desc text-white/80">
              {copy.subheadline}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
              <Button variant="gold" size="lg" asChild>
                <a href={links.locations}>{copy.cta}</a>
              </Button>
              <Button variant="outlineGold" size="lg" asChild>
                <a href={links.shop}>{copy.ctaSecondary}</a>
              </Button>
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start"
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
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
