'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Footer } from '@/components/layout/Footer'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { TopMarketBar } from '@/components/layout/TopMarketBar'
import {
  MotionPage,
  MotionProvider,
  MotionReadyProvider,
  RouteTransition,
  SitePreloader,
} from '@/components/motion'
import { Toaster } from '@/components/ui/sonner'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
    },
  },
})

export function AppLayout({ children }: { children: ReactNode }) {
  const chromeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = chromeRef.current
    if (!el) return

    const setChromeHeight = () => {
      document.documentElement.style.setProperty(
        '--site-chrome-height',
        `${el.getBoundingClientRect().height}px`,
      )
    }

    setChromeHeight()
    const ro = new ResizeObserver(setChromeHeight)
    ro.observe(el)
    window.addEventListener('resize', setChromeHeight)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', setChromeHeight)
    }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <MotionReadyProvider>
        <MotionProvider>
          <SitePreloader />
          <RouteTransition />
          <div className="flex min-h-dvh flex-col overflow-x-clip">
            <div ref={chromeRef}>
              <TopMarketBar />
              <SiteHeader />
            </div>
            <main className="flex-1">
              <MotionPage>{children}</MotionPage>
            </main>
            <Footer />
          </div>
          <Toaster />
        </MotionProvider>
      </MotionReadyProvider>
    </QueryClientProvider>
  )
}
