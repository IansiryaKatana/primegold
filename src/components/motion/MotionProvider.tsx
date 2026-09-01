'use client'

import { useEffect, type ReactNode } from 'react'
import { useRouterState } from '@tanstack/react-router'
import { registerGsapPlugins, ScrollTrigger, refreshScrollTriggers } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function MotionProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  useEffect(() => {
    if (reduced) return
    registerGsapPlugins()

    ScrollTrigger.batch('[data-animate="fade-up"]', {
      start: 'top 85%',
      once: true,
      onEnter: (batch) => {
        import('@/lib/gsap').then(({ gsap }) => {
          gsap.from(batch, {
            y: 28,
            opacity: 0,
            duration: 0.65,
            stagger: 0.08,
            ease: 'power3.out',
          })
        })
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars?.id === 'data-animate-batch') t.kill()
      })
    }
  }, [reduced])

  useEffect(() => {
    const timer = window.setTimeout(() => refreshScrollTriggers(), 100)
    return () => window.clearTimeout(timer)
  }, [pathname])

  return <>{children}</>
}
