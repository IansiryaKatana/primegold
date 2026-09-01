import type { ReactNode } from 'react'
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'
import appCss from '@/styles/app.css?url'
import { AppLayout } from '@/components/layout/AppLayout'

const preloadSkipScript = `try{if(sessionStorage.getItem('pg-preloaded')||matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('preload-skip')}catch(e){}`

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Prime Gold Trading | Buy & Sell Gold, Silver & Jewelry',
      },
      {
        name: 'description',
        content:
          'Prime Gold Trading — your trusted partner for buying and selling gold, silver, jewelry, and coins. 100+ branches nationwide. Book an appointment today.',
      },
    ],
    links: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      { rel: 'apple-touch-icon', href: '/favicon.png' },
      { rel: 'manifest', href: '/manifest.json' },
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500&display=swap',
      },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <AppLayout>
        <Outlet />
      </AppLayout>
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: preloadSkipScript }} />
        <div id="site-preloader" className="site-preloader" aria-hidden="true">
          <div className="site-preloader__panel site-preloader__panel--top" />
          <div className="site-preloader__panel site-preloader__panel--bottom" />
          <div className="site-preloader__brand">
            <img
              className="site-preloader__logo"
              src="/logo.png"
              alt=""
              width={320}
              height={48}
            />
            <div className="site-preloader__line" />
          </div>
        </div>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
