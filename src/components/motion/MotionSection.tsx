'use client'

import { useRef, type ReactNode, type ComponentPropsWithoutRef } from 'react'
import { useGSAP, scrollReveal } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

type MotionSectionProps = ComponentPropsWithoutRef<'section'> & {
  children: ReactNode
  tier?: 'a' | 'b' | 'c' | 'd'
  /** Animate direct children with stagger */
  stagger?: boolean
  staggerAmount?: number
}

export function MotionSection({
  children,
  className,
  tier = 'b',
  stagger = false,
  staggerAmount = 0.08,
  ...props
}: MotionSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (!ref.current || reduced) return

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
    { scope: ref, dependencies: [reduced, tier, stagger, staggerAmount] },
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
