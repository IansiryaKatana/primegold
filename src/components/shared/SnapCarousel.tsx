'use client'

import { Children, useCallback, useEffect, useState, type ReactNode } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { cn } from '@/lib/utils'

type SnapCarouselProps = {
  children: ReactNode
  /** Desktop grid classes, shown from lg up */
  gridClassName: string
  slideClassName?: string
}

export function SnapCarousel({
  children,
  gridClassName,
  slideClassName = 'min-w-0 flex-[0_0_85%] sm:flex-[0_0_48%]',
}: SnapCarouselProps) {
  const items = Children.toArray(children)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: false,
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

  return (
    <>
      <div className="lg:hidden" data-snap-carousel>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {items.map((child, i) => (
              <div key={i} className={cn(slideClassName)}>
                {child}
              </div>
            ))}
          </div>
        </div>
        {items.length > 1 && (
          <div className="mt-5 flex justify-center gap-2">
            {items.map((_, i) => (
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
        )}
      </div>
      <div className={cn('hidden lg:grid', gridClassName)}>{items}</div>
    </>
  )
}
