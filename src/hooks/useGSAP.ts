'use client'

import { useEffect, useRef, type DependencyList } from 'react'
import { gsap, registerGsapPlugins } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function useGSAP(
  callback: (ctx: ReturnType<typeof gsap.context>) => void | (() => void),
  deps: DependencyList = [],
) {
  const scope = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !scope.current) return
    registerGsapPlugins()
    const ctx = gsap.context(() => {
      callback(ctx)
    }, scope)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, ...deps])

  return scope
}
