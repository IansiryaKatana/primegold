'use client'

import { useRef, type ReactNode } from 'react'
import { useGSAP, gsap, scrollReveal } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useMotionReady } from '@/components/motion/SitePreloader'
import { cn } from '@/lib/utils'

type RevealBlockProps = {
  children: ReactNode
  className?: string
  delay?: number
  x?: number
  y?: number
  /** Set false for above-the-fold content */
  scroll?: boolean
}

export function RevealBlock({
  children,
  className,
  delay = 0,
  x,
  y = 28,
  scroll = true,
}: RevealBlockProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const ready = useMotionReady()

  useGSAP(
    () => {
      if (!ref.current) return
      if (!ready || reduced) {
        ref.current.style.opacity = '1'
        ref.current.style.transform = 'none'
        return
      }

      if (scroll) {
        scrollReveal(ref.current, {
          y,
          x,
          delay,
          scrollTrigger: { trigger: ref.current, once: true },
        })
      } else {
        gsap.fromTo(
          ref.current,
          { y, x: x ?? 0, opacity: 0 },
          {
            y: 0,
            x: 0,
            opacity: 1,
            duration: 0.65,
            delay,
            ease: 'power3.out',
          },
        )
      }
    },
    { scope: ref, dependencies: [reduced, scroll, delay, x, y, ready] },
  )

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  )
}
