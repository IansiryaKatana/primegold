'use client'

import { AnimatePresence, motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useRouterState } from '@tanstack/react-router'
import { pageTransition } from '@/lib/motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function MotionPage({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  if (reduced) {
    return <div key={pathname}>{children}</div>
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={pageTransition.initial}
        animate={pageTransition.animate}
        exit={pageTransition.exit}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
