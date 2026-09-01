'use client'

import { useRef, type ReactNode } from 'react'
import { useGSAP, scrollReveal } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useMotionReady } from '@/components/motion/SitePreloader'
import { cn } from '@/lib/utils'

type StaggerGridProps = {
  children: ReactNode
  className?: string
  stagger?: number
  childSelector?: string
}

export function StaggerGrid({
  children,
  className,
  stagger = 0.08,
  childSelector = ':scope > *',
}: StaggerGridProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const ready = useMotionReady()

  useGSAP(
    () => {
      if (!ref.current || reduced || !ready) return
      const items = ref.current.querySelectorAll(childSelector)
      if (!items.length) return

      scrollReveal(items, {
        stagger,
        scrollTrigger: { trigger: ref.current, once: true },
      })
    },
    { scope: ref, dependencies: [reduced, stagger, childSelector, ready] },
  )

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  )
}

/** Fade-up children already rendered (e.g. table rows) */
export function StaggerChildren({
  children,
  className,
  stagger = 0.06,
}: Omit<StaggerGridProps, 'childSelector'>) {
  return (
    <StaggerGrid className={className} stagger={stagger}>
      {children}
    </StaggerGrid>
  )
}
