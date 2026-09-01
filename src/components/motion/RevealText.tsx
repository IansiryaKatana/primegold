'use client'

import { useRef } from 'react'
import { useGSAP, splitTextReveal } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

type RevealTextProps = {
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  children: string
  className?: string
  id?: string
  type?: 'lines' | 'words'
  /** Set false for above-the-fold heroes that animate on mount */
  scroll?: boolean
}

export function RevealText({
  as: Tag = 'h2',
  children,
  className,
  id,
  type = 'lines',
  scroll = true,
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (!ref.current) return
      const result = splitTextReveal(ref.current, {
        type,
        reducedMotion: reduced,
        scrollTrigger: scroll ? undefined : false,
      })
      return () => result.revert()
    },
    { scope: ref, dependencies: [children, reduced, scroll, type] },
  )

  return (
    <Tag ref={ref as never} id={id} className={cn(className)}>
      {children}
    </Tag>
  )
}
