'use client'

import { useRef, type CSSProperties, type ReactNode } from 'react'
import { useGSAP, gsap, parallaxScrub } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

type ParallaxBgProps = {
  children?: ReactNode
  className?: string
  style?: CSSProperties
  yPercent?: number
  /** Ken Burns style slow zoom loop (hero only) */
  kenBurns?: boolean
}

export function ParallaxBg({
  children,
  className,
  style,
  yPercent = 15,
  kenBurns = false,
}: ParallaxBgProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (!ref.current || reduced) return

      if (kenBurns) {
        gsap.to(ref.current, {
          scale: 1.08,
          duration: 20,
          repeat: -1,
          yoyo: true,
          ease: 'none',
        })
      } else {
        parallaxScrub(ref.current, { yPercent })
      }
    },
    { scope: ref, dependencies: [reduced, yPercent, kenBurns] },
  )

  return (
    <div ref={ref} className={cn(className)} style={style} aria-hidden>
      {children}
    </div>
  )
}
