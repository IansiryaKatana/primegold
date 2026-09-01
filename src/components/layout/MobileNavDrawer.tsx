'use client'

import { useState } from 'react'
import {
  ChevronRight,
  MapPin,
  Menu,
  Phone,
  Search,
  ShoppingBag,
  TrendingUp,
  User,
} from 'lucide-react'
import { BrandLogo } from '@/components/shared/BrandLogo'
import { AppLink } from '@/components/shared/AppLink'
import { brand } from '@/data/copy'
import { footerNavColumns, links } from '@/lib/links'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

const featuredLinks = [
  { label: 'Buy Gold', href: links.collections.goldBars, icon: ShoppingBag },
  { label: 'Sell Gold', href: links.sell, icon: TrendingUp },
  { label: 'Find a Branch', href: links.locations, icon: MapPin },
] as const

const menuGroups = [
  { id: 'shop', title: 'Shop', items: footerNavColumns.shop },
  { id: 'sell', title: 'Sell', items: footerNavColumns.sell },
  { id: 'company', title: 'Company', items: footerNavColumns.company },
] as const

export function MobileNavDrawer() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10 lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 p-0 sm:max-w-sm [&>button]:text-white [&>button]:hover:bg-white/10 [&>button]:hover:opacity-100"
      >
        <div className="shrink-0 bg-emerald-deep px-6 pb-5 pt-6">
          <SheetHeader className="space-y-1 pr-8 text-left">
            <div className="flex flex-col gap-3">
              <BrandLogo className="h-9 max-w-[220px]" />
              <SheetTitle className="text-lg text-white">Menu</SheetTitle>
            </div>
            <SheetDescription className="sr-only">
              Site navigation, search, and quick links
            </SheetDescription>
          </SheetHeader>
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto">
          <div className="space-y-6 px-6 py-5">
            <form action={links.shop} method="get" className="flex" onSubmit={close}>
              <Input
                name="q"
                placeholder="Search products..."
                className="rounded-r-none border-warm-border"
              />
              <Button type="submit" size="icon" variant="emerald" className="shrink-0 rounded-l-none">
                <Search className="size-4" />
                <span className="sr-only">Search</span>
              </Button>
            </form>

            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="h-auto flex-col gap-1.5 py-3" asChild>
                <AppLink href={links.account} onClick={close}>
                  <User className="size-5 text-gold" />
                  <span className="text-xs">Account</span>
                </AppLink>
              </Button>
              <Button variant="outline" className="h-auto flex-col gap-1.5 py-3" asChild>
                <a href={`tel:${brand.phone.replace(/\D/g, '')}`} onClick={close}>
                  <Phone className="size-5 text-gold" />
                  <span className="text-xs">Call Us</span>
                </a>
              </Button>
            </div>

            <div>
              <p className="text-label mb-2 text-gold">
                Quick Links
              </p>
              <div className="surface-inset overflow-hidden">
                {featuredLinks.map((link, i) => (
                  <div key={link.label}>
                    <AppLink
                      href={link.href}
                      onClick={close}
                      className="flex items-center gap-3 px-4 py-3.5 text-sm text-primary-text transition-colors hover:bg-cream md:text-base"
                    >
                      <link.icon className="size-5 shrink-0 text-gold" aria-hidden />
                      {link.label}
                      <ChevronRight className="ml-auto size-4 text-gold/70" aria-hidden />
                    </AppLink>
                    {i < featuredLinks.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            </div>

            <Accordion type="multiple" defaultValue={['shop']} className="w-full">
              {menuGroups.map((group) => (
                <AccordionItem key={group.id} value={group.id} className="border-warm-border">
                  <AccordionTrigger className="text-label py-3.5 text-primary-text hover:text-gold">
                    {group.title}
                  </AccordionTrigger>
                  <AccordionContent className="pb-2">
                    <ul className="flex flex-col gap-0.5">
                      {group.items.map((item) => (
                        <li key={item.label}>
                          <AppLink
                            href={item.href}
                            onClick={close}
                            className="block rounded-sm px-2 py-2 text-sm text-muted-text transition-colors hover:bg-cream hover:text-primary-text"
                          >
                            {item.label}
                          </AppLink>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        <div className="shrink-0 space-y-2 border-t border-warm-border bg-cream px-6 py-4">
          <Button variant="emerald" className="w-full" asChild>
            <AppLink href={links.locations} onClick={close}>
              Book an Appointment
            </AppLink>
          </Button>
          <Button variant="gold" className="w-full" asChild>
            <AppLink href={links.shop} onClick={close}>
              Shop All Products
            </AppLink>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
