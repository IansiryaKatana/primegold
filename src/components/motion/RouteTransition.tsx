'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useRouterState } from '@tanstack/react-router'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useMotionReady } from '@/components/motion/SitePreloader'

const SKIP_TRANSITION = ['/checkout']

/** Survives layout remounts on SPA navigations */
let hasCompletedInitialRoute = false

export function RouteTransition() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const reduced = useReducedMotion()
  const ready = useMotionReady()
  const [active, setActive] = useState(false)

  useEffect(() => {
    document.getElementById('route-wipe')?.remove()
  }, [])

  useEffect(() => {
    if (!hasCompletedInitialRoute) {
      hasCompletedInitialRoute = true
      return
    }
    if (!ready || reduced) return
    if (SKIP_TRANSITION.some((p) => pathname.startsWith(p))) return

    setActive(true)
    const hide = window.setTimeout(() => setActive(false), 580)

    return () => {
      window.clearTimeout(hide)
    }
  }, [pathname, ready, reduced])

  if (reduced || !ready) return null

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="route-transition"
          className="route-transition"
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="route-transition__orbit">
            <span className="route-transition__bar" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
