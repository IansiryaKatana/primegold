'use client'

import { useRef, type ReactNode, type ComponentPropsWithoutRef } from 'react'
import { useGSAP, scrollReveal } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useMotionReady } from '@/components/motion/SitePreloader'
import { cn } from '@/lib/utils'

type MotionSectionProps = ComponentPropsWithoutRef<'section'> & {
  children: ReactNode
  tier?: 'a' | 'b' | 'c' | 'd'
  /** Animate direct children with stagger */
  stagger?: boolean
  staggerAmount?: number
  /** Override: off by default so inner RevealBlock/StaggerGrid own the animation */
  reveal?: boolean
}

export function MotionSection({
  children,
  className,
  tier = 'b',
  stagger = false,
  staggerAmount = 0.08,
  reveal,
  ...props
}: MotionSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const ready = useMotionReady()
  const shouldReveal = reveal ?? stagger

  useGSAP(
    () => {
      if (!ref.current || reduced || !ready || !shouldReveal) return

      if (tier === 'd') {
        scrollReveal(ref.current, {
          y: 16,
          duration: 0.5,
          scrollTrigger: { trigger: ref.current, once: true },
        })
        return
      }

      if (stagger) {
        const items = ref.current.querySelectorAll(':scope > *')
        if (items.length) {
          scrollReveal(items, {
            stagger: staggerAmount,
            scrollTrigger: { trigger: ref.current, once: true },
          })
        }
      } else {
        scrollReveal(ref.current, {
          scrollTrigger: { trigger: ref.current, once: true },
        })
      }
    },
    { scope: ref, dependencies: [reduced, tier, stagger, staggerAmount, ready, shouldReveal] },
  )

  return (
    <section
      ref={ref}
      data-motion-section={tier}
      className={cn(className)}
      {...props}
    >
      {children}
    </section>
  )
}
