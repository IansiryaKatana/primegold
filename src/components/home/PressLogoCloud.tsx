'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import type { PressLogo } from '@/lib/types'
import { homeCopy } from '@/data/copy'
import { Container, SectionHeading } from '@/components/shared/primitives'
import { cn } from '@/lib/utils'

type PressLogoMarksProps = {
  logos: PressLogo[]
  variant?: 'light' | 'dark'
  className?: string
}

function PressLogoMark({
  logo,
  variant = 'light',
  className,
}: {
  logo: PressLogo
  variant?: 'light' | 'dark'
  className?: string
}) {
  const content = logo.logoUrl ? (
    <img
      src={logo.logoUrl}
      alt=""
      aria-hidden
      className={cn(
        'h-7 w-auto max-w-[130px] object-contain transition-opacity group-hover:opacity-80 md:h-8',
        variant === 'dark' && 'brightness-0 invert opacity-90',
      )}
    />
  ) : (
    <span
      className={cn(
        'text-lg tracking-wide transition-colors',
        variant === 'dark'
          ? 'text-white/60 group-hover:text-white'
          : 'text-muted-text/50 group-hover:text-muted-text',
      )}
    >
      {logo.name}
    </span>
  )

  const wrapperClass = cn(
    'group flex h-12 items-center justify-center',
    className,
  )

  if (logo.href) {
    return (
      <a
        href={logo.href}
        target="_blank"
        rel="noopener noreferrer"
        className={wrapperClass}
        aria-label={logo.name}
      >
        {content}
      </a>
    )
  }

  return (
    <div className={wrapperClass} aria-label={logo.name}>
      {content}
    </div>
  )
}

export function PressLogoMarks({ logos, variant = 'light', className }: PressLogoMarksProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
    slidesToScroll: 2,
  })
  const [selectedPage, setSelectedPage] = useState(0)
  const pageCount = Math.max(1, Math.ceil(logos.length / 2))

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedPage(Math.floor(emblaApi.selectedScrollSnap() / 2))
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
    <div className={className}>
      <div className="md:hidden">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {logos.map((logo) => (
              <div key={logo.id} className="min-w-0 flex-[0_0_50%] px-2">
                <PressLogoMark logo={logo} variant={variant} />
              </div>
            ))}
          </div>
        </div>
        {pageCount > 1 && (
          <div className="mt-5 flex justify-center gap-2">
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => emblaApi?.scrollTo(i * 2)}
                className={cn(
                  'size-2 rounded-full transition-colors',
                  i === selectedPage
                    ? 'bg-gold'
                    : variant === 'dark'
                      ? 'bg-white/30'
                      : 'bg-warm-border',
                )}
                aria-label={`Show press logos ${i * 2 + 1}–${Math.min(i * 2 + 2, logos.length)}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="hidden flex-wrap items-center justify-center gap-x-10 gap-y-8 md:flex md:gap-x-14">
        {logos.map((logo) => (
          <PressLogoMark key={logo.id} logo={logo} variant={variant} className="h-10 md:h-11" />
        ))}
      </div>
    </div>
  )
}

type PressLogoCloudProps = {
  logos: PressLogo[]
}

export function PressLogoCloud({ logos }: PressLogoCloudProps) {
  return (
    <section id="press" className="bg-white py-14">
      <Container>
        <SectionHeading title={homeCopy.press.title} />
        <PressLogoMarks logos={logos} variant="light" />
      </Container>
    </section>
  )
}
