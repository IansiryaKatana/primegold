'use client'

import { useEffect, type ReactNode } from 'react'
import { useRouter, useRouterState } from '@tanstack/react-router'
import { registerGsapPlugins, refreshScrollTriggers } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useCartStore } from '@/store/cart'

function isPlainLeftClick(event: MouseEvent) {
  return (
    !event.defaultPrevented &&
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  )
}

export function MotionProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()
  const router = useRouter()
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const setDrawerOpen = useCartStore((s) => s.setDrawerOpen)

  useEffect(() => {
    if (reduced) return
    registerGsapPlugins()
  }, [reduced])

  useEffect(() => {
    setDrawerOpen(false)
    const timer = window.setTimeout(() => refreshScrollTriggers(), 100)
    return () => window.clearTimeout(timer)
  }, [pathname, setDrawerOpen])

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (!isPlainLeftClick(event)) return
      const target = (event.target as HTMLElement | null)?.closest('a')
      if (!target) return
      const hrefAttr = target.getAttribute('href')
      if (!hrefAttr || !hrefAttr.startsWith('/') || hrefAttr.startsWith('//')) return
      if (target.hasAttribute('download') || target.target === '_blank') return

      const url = new URL(hrefAttr, window.location.origin)
      const next = `${url.pathname}${url.search}${url.hash}`
      const current = `${window.location.pathname}${window.location.search}${window.location.hash}`
      if (next === current) return

      event.preventDefault()

      try {
        router.history.push(next)
      } catch {
        window.location.assign(next)
      }
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [router])

  return <>{children}</>
}
