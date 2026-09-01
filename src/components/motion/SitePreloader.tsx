'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const STORAGE_KEY = 'pg-preloaded'
const MAX_WAIT_MS = 1800

type MotionReadyContextValue = {
  ready: boolean
  markReady: () => void
}

const MotionReadyContext = createContext<MotionReadyContextValue>({
  ready: true,
  markReady: () => {},
})

function shouldSkipPreload() {
  if (typeof window === 'undefined') return true
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

function persistPreload() {
  try {
    sessionStorage.setItem(STORAGE_KEY, '1')
  } catch {
    /* ignore */
  }
}

export function useMotionReady() {
  return useContext(MotionReadyContext).ready
}

export function MotionReadyProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false)

  const markReady = useCallback(() => {
    persistPreload()
    document.documentElement.classList.add('preload-skip')
    setReady(true)
  }, [])

  const value = useMemo(() => ({ ready, markReady }), [ready, markReady])

  return <MotionReadyContext.Provider value={value}>{children}</MotionReadyContext.Provider>
}

export function SitePreloader() {
  const reduced = useReducedMotion()
  const { ready, markReady } = useContext(MotionReadyContext)

  useEffect(() => {
    const root = document.getElementById('site-preloader')
    if (ready || reduced || shouldSkipPreload()) {
      root?.classList.add('is-done')
      markReady()
      return
    }
    if (!root) {
      markReady()
      return
    }

    const logo = root.querySelector<HTMLElement>('.site-preloader__logo')
    const line = root.querySelector<HTMLElement>('.site-preloader__line')
    const top = root.querySelector<HTMLElement>('.site-preloader__panel--top')
    const bottom = root.querySelector<HTMLElement>('.site-preloader__panel--bottom')
    const brand = root.querySelector<HTMLElement>('.site-preloader__brand')

    const fontsReady = document.fonts?.ready ?? Promise.resolve()
    const wait = Promise.race([
      fontsReady,
      new Promise((resolve) => window.setTimeout(resolve, MAX_WAIT_MS)),
    ])

    let killed = false
    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        if (killed) return
        root.classList.add('is-done')
        markReady()
      },
    })

    gsap.set(logo, { opacity: 0, y: 12 })
    gsap.set(line, { scaleX: 0 })
    gsap.set([top, bottom], { yPercent: 0 })

    tl.to(logo, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' })
      .to(line, { scaleX: 1, duration: 0.55, ease: 'power2.inOut' }, '-=0.1')
      .to(brand, { opacity: 0, duration: 0.25, ease: 'power2.out' }, '+=0.15')
      .to(top, { yPercent: -100, duration: 0.7, ease: 'power3.inOut' }, '<')
      .to(bottom, { yPercent: 100, duration: 0.7, ease: 'power3.inOut' }, '<')

    wait.then(() => {
      if (!killed) tl.play()
    })

    const failSafe = window.setTimeout(() => {
      if (killed) return
      tl.progress(1)
      root.classList.add('is-done')
      markReady()
    }, MAX_WAIT_MS + 1200)

    return () => {
      killed = true
      window.clearTimeout(failSafe)
      tl.kill()
    }
  }, [markReady, ready, reduced])

  return null
}
