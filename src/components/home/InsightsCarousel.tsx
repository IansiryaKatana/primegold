'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { insightLink } from '@/lib/links'
import { AppLink } from '@/components/shared/AppLink'
import { homeCopy } from '@/data/copy'
import type { InsightArticle } from '@/lib/types'
import { MotionSection } from '@/components/motion'
import { useGSAP, scrollReveal } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { Button } from '@/components/ui/button'
import { Container, SectionHeading } from '@/components/shared/primitives'
import { cn } from '@/lib/utils'

type InsightsCarouselProps = {
  articles: InsightArticle[]
}

export function InsightsCarousel({ articles }: InsightsCarouselProps) {
  const slidesRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    slidesToScroll: 1,
  })
  const [selectedIndex, setSelectedIndex] = useState(0)

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

  useGSAP(
    () => {
      if (!slidesRef.current || reduced) return
      const slides = slidesRef.current.querySelectorAll('.insight-slide')
      scrollReveal(slides, {
        stagger: 0.08,
        scrollTrigger: { trigger: slidesRef.current, once: true },
      })
    },
    { scope: slidesRef, dependencies: [articles, reduced] },
  )

  return (
    <MotionSection id="insights" tier="b" className="bg-white py-16 md:py-20">
      <Container>
        <SectionHeading title={homeCopy.insights.title} />

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4" ref={slidesRef}>
            {articles.map((article) => (
              <div
                key={article.id}
                className="insight-slide min-w-0 flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_22%]"
              >
                <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-sm">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-dark/90 via-emerald-dark/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-5">
                    <h3 className="text-base leading-snug text-white md:text-lg">
                      {article.title}
                    </h3>
                    <Button variant="gold" size="sm" className="w-fit" asChild>
                      <AppLink href={insightLink(article.slug)}>Learn More</AppLink>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {articles.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => emblaApi?.scrollTo(i)}
              className={cn(
                'size-2 rounded-full transition-colors',
                i === selectedIndex ? 'bg-gold' : 'bg-warm-border',
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </Container>
    </MotionSection>
  )
}
