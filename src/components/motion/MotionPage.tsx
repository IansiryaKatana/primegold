'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { pageTransition } from '@/lib/motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function MotionPage({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <>{children}</>
  }

  return (
    <motion.div
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
    >
      {children}
    </motion.div>
  )
}
