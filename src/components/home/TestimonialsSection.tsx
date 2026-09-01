'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { homeCopy } from '@/data/copy'
import type { PressLogo, Testimonial } from '@/lib/types'
import { RevealBlock } from '@/components/motion'
import { Card, CardContent } from '@/components/ui/card'
import { Container, RatingStars } from '@/components/shared/primitives'
import { PressLogoMarks } from '@/components/home/PressLogoCloud'
import { cn } from '@/lib/utils'

type TestimonialsSectionProps = {
  testimonials: Testimonial[]
  pressLogos: PressLogo[]
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="h-full border-0 bg-white shadow-md">
      <CardContent className="flex h-full flex-col gap-3 p-5">
        <RatingStars rating={testimonial.rating} />
        <p className="flex-1 text-sm font-light leading-relaxed text-muted-text md:text-base">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
        <p className="text-sm text-primary-text md:text-base">{testimonial.name}</p>
      </CardContent>
    </Card>
  )
}

function SummaryCard() {
  const copy = homeCopy.testimonials

  return (
    <Card className="h-full border-0 bg-white text-primary-text shadow-md">
      <CardContent className="flex h-full flex-col justify-center gap-3 bg-white p-5">
        <p className="text-lg text-primary-text md:text-xl">{copy.summaryLabel}</p>
        <RatingStars rating={5} className="[&_svg]:size-5" />
        <p className="text-sm font-light text-muted-text md:text-base">
          {copy.summaryMeta}
        </p>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-full bg-emerald-deep">
            <span className="text-xs text-gold">PG</span>
          </div>
          <span className="text-sm text-primary-text">Prime Gold Trading</span>
        </div>
      </CardContent>
    </Card>
  )
}

export function TestimonialsSection({ testimonials, pressLogos }: TestimonialsSectionProps) {
  const copy = homeCopy.testimonials
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    dragFree: true,
  })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const slideCount = testimonials.length + 1

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden py-16 md:py-24"
      aria-labelledby="testimonials-heading"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/bg.png)' }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-emerald-dark/20" aria-hidden />

      <Container className="relative">
        <RevealBlock>
          <h2
            id="testimonials-heading"
            className="mb-10 text-center text-heading-inverse md:mb-14"
          >
            {copy.eyebrow}
          </h2>
        </RevealBlock>

        <div className="rounded-xl border border-white/20 bg-emerald-dark p-6 md:p-10 lg:p-12">
          <RevealBlock className="mb-8 max-w-2xl">
            <h3 className="text-2xl text-white md:text-3xl lg:text-4xl">{copy.title}</h3>
            <p className="mt-2 text-desc-inverse">{copy.subtitle}</p>
          </RevealBlock>

          <div className="-mx-2 overflow-hidden px-2" ref={emblaRef}>
            <div className="flex gap-4">
              <div className="min-w-0 flex-[0_0_85%] sm:flex-[0_0_55%] lg:flex-[0_0_32%]">
                <SummaryCard />
              </div>
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="min-w-0 flex-[0_0_85%] sm:flex-[0_0_55%] lg:flex-[0_0_32%]"
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>

          {slideCount > 1 && (
            <div className="mt-6 flex justify-center gap-2">
              {Array.from({ length: slideCount }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => emblaApi?.scrollTo(i)}
                  className={cn(
                    'size-2 rounded-full transition-colors',
                    i === selectedIndex ? 'bg-gold' : 'bg-white/30',
                  )}
                  aria-label={`Go to testimonial slide ${i + 1}`}
                />
              ))}
            </div>
          )}

          {pressLogos.length > 0 && (
            <RevealBlock className="mt-10 border-t border-white/15 pt-8 md:mt-12 md:pt-10">
              <p className="text-label mb-6 text-center text-gold">
                {homeCopy.press.title}
              </p>
              <PressLogoMarks logos={pressLogos} variant="dark" />
            </RevealBlock>
          )}
        </div>
      </Container>
    </section>
  )
}
