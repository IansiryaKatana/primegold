'use client'

import { Phone, Search, User } from 'lucide-react'
import { BrandLogo } from '@/components/shared/BrandLogo'
import { navLinks } from '@/lib/links'
import { links } from '@/lib/links'
import { brand } from '@/data/copy'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { MobileNavDrawer } from '@/components/layout/MobileNavDrawer'
import { Container } from '@/components/shared/primitives'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-emerald-deep shadow-lg">
      <Container>
        <div className="flex items-center gap-3 py-3 sm:gap-4">
          <a href={links.home} className="flex min-w-0 shrink-0 items-center">
            <BrandLogo className="h-9 sm:h-10 md:h-11" />
          </a>

          <div className="mx-auto hidden min-w-0 max-w-md flex-1 items-center gap-0 lg:flex">
            <form action={links.shop} method="get" className="flex flex-1">
              <Input
                name="q"
                placeholder="Search products..."
                className="rounded-r-none border-white/20 bg-white text-primary-text"
              />
              <Button type="submit" size="icon" className="rounded-l-none bg-emerald-dark hover:bg-emerald-hover">
                <Search />
              </Button>
            </form>
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 sm:hidden"
              asChild
            >
              <a href={links.account} aria-label="My Account">
                <User />
              </a>
            </Button>
            <Button variant="ghost" size="sm" className="hidden text-white hover:bg-white/10 lg:inline-flex" asChild>
              <a href={links.account}>
                <User />
                My Account
              </a>
            </Button>
            <CartDrawer />
            <a
              href={`tel:${brand.phone.replace(/\D/g, '')}`}
              className="hidden items-center gap-2 text-base text-gold lg:flex"
            >
              <Phone className="size-4" />
              {brand.phone}
            </a>
            <MobileNavDrawer />
          </div>
        </div>

        <nav className="hidden border-t border-white/10 py-2 lg:block">
          <ul className="flex w-full flex-wrap items-center justify-center gap-x-3 gap-y-1 xl:justify-between xl:gap-x-5">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm text-white/90 transition-colors hover:text-gold md:text-base"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  )
}
