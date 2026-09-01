'use client'

import { useQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { Minus, TrendingDown, TrendingUp } from 'lucide-react'
import { getMarketTicker } from '@/server/functions'
import { links } from '@/lib/links'
import { AppLink } from '@/components/shared/AppLink'
import { cn } from '@/lib/utils'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

function TrendIcon({ changePct }: { changePct: number | null | undefined }) {
  if (changePct == null || Math.abs(changePct) < 0.01) {
    return <Minus className="size-3 text-white/60" />
  }

  if (changePct > 0) {
    return <TrendingUp className="size-3 text-green-400" />
  }

  return <TrendingDown className="size-3 text-red-400" />
}

export function TopMarketBar() {  const dotRef = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()
  const { data } = useQuery({
    queryKey: ['market-ticker'],
    queryFn: () => getMarketTicker(),
    refetchInterval: 60000,
  })

  useEffect(() => {
    if (reduced || !dotRef.current) return
    const tween = gsap.to(dotRef.current, {
      scale: 1.4,
      opacity: 0.6,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
    return () => {
      tween.kill()
    }
  }, [reduced])

  return (
    <div className="bg-emerald-dark text-xs text-white/90 md:text-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 overflow-x-auto px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex shrink-0 items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span ref={dotRef} className="size-1.5 rounded-full bg-gold" />
            <span className="text-gold">Live Gold:</span>
            <span>${data?.goldPrice?.toFixed(2) ?? '—'}</span>
            <TrendIcon changePct={data?.goldChangePct} />
          </span>
          <span className="hidden items-center gap-1.5 sm:flex">
            <span className="size-1.5 rounded-full bg-gold" />
            <span className="text-gold">Live Silver:</span>
            <span>${data?.silverPrice?.toFixed(2) ?? '—'}</span>
            <TrendIcon changePct={data?.silverChangePct} />
          </span>
        </div>
        <div className="hidden shrink-0 items-center gap-2 md:flex">
          <span
            className={cn(
              'size-1.5 rounded-full',
              data?.marketStatus === 'open' ? 'bg-green-400' : 'bg-red-400',
            )}
          />
          <span>
            Market {data?.marketStatus === 'open' ? 'Open' : 'Closed'}:{' '}
            {data?.marketHoursLabel ?? 'Mon - Fri 9:30 AM - 5:30 PM'}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-4 text-gold">
          <AppLink href={links.account} className="hover:text-gold-light">
            My Account
          </AppLink>
          <AppLink href={links.cart} className="hover:text-gold-light">
            Cart
          </AppLink>
        </div>
      </div>
    </div>
  )
}
