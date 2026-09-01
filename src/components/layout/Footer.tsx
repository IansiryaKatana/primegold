'use client'

import { useState, type ReactNode } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import { BrandLogo } from '@/components/shared/BrandLogo'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { PaymentMethods } from '@/components/shared/PaymentIcons'
import { subscribeNewsletter } from '@/server/functions'
import { brand } from '@/data/copy'
import { footerNavColumns, links } from '@/lib/links'
import { cn } from '@/lib/utils'

const footerSectionTitles = {
  shop: 'Shop',
  sell: 'Sell',
  company: 'Company',
  contact: 'Contact',
  newsletter: 'Newsletter',
} as const

function FooterColumn({
  title,
  children,
  className,
}: {
  title?: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex min-w-0 flex-col gap-4', className)}>
      {title && (
        <h4 className="text-xs font-normal uppercase tracking-[0.15em] text-gold md:text-sm">
          {title}
        </h4>
      )}
      {children}
    </div>
  )
}

function FooterLinkColumn({
  title,
  items,
}: {
  title: string
  items: Array<{ label: string; href: string }>
}) {
  return (
    <FooterColumn title={title}>
      <nav aria-label={title}>
        <ul className="flex flex-col gap-2">
          {items.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-sm font-extralight leading-snug text-white/70 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </FooterColumn>
  )
}

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      await subscribeNewsletter({ data: { email } })
      toast.success('Thank you for subscribing!')
      setEmail('')
    } catch {
      toast.error('Subscription failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
      <p className="text-sm font-extralight leading-relaxed text-white/60">
        Market insights and exclusive offers.
      </p>
      <div className="flex flex-col gap-2">
        <Label htmlFor="footer-email" className="sr-only">
          Email address
        </Label>
        <Input
          id="footer-email"
          type="email"
          required
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-white/20 bg-white/10 text-white placeholder:text-white/40 focus-visible:ring-gold/40"
        />
        <Button type="submit" variant="gold" size="sm" disabled={loading} className="w-full">
          {loading ? 'Subscribing…' : 'Subscribe'}
        </Button>
      </div>
    </form>
  )
}

function BrandColumn() {
  return (
    <FooterColumn className="min-w-0 overflow-hidden">
      <a href={links.home} className="flex w-full items-center">
        <BrandLogo className="h-11 w-auto max-w-full md:h-12" />
      </a>
      <p className="w-full text-sm font-extralight leading-relaxed text-white/70">
        {brand.blurb}
      </p>
    </FooterColumn>
  )
}

function ContactColumn() {
  return (
    <FooterColumn title={footerSectionTitles.contact}>
      <ul className="flex flex-col gap-2.5 text-sm font-extralight text-white/80">
        <li>
          <a
            href={`mailto:${brand.email}`}
            className="inline-flex items-start gap-2 hover:text-white"
          >
            <Mail className="mt-0.5 size-4 shrink-0 text-gold" />
            <span className="break-all">{brand.email}</span>
          </a>
        </li>
        <li>
          <a
            href={`tel:${brand.phone.replace(/\D/g, '')}`}
            className="inline-flex items-center gap-2 hover:text-white"
          >
            <Phone className="size-4 shrink-0 text-gold" />
            {brand.phone}
          </a>
        </li>
        <li className="flex items-start gap-2">
          <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
          <span className="leading-snug">{brand.address}</span>
        </li>
        <li className="text-white/60">{brand.hours}</li>
      </ul>
    </FooterColumn>
  )
}

function FooterMainGrid({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(16rem,1.4fr)_repeat(5,minmax(0,1fr))] lg:items-start lg:gap-x-10 lg:gap-y-0 xl:gap-x-12',
        className,
      )}
    >
      <BrandColumn />
      <FooterLinkColumn title={footerSectionTitles.shop} items={[...footerNavColumns.shop]} />
      <FooterLinkColumn title={footerSectionTitles.sell} items={[...footerNavColumns.sell]} />
      <FooterLinkColumn
        title={footerSectionTitles.company}
        items={[...footerNavColumns.company]}
      />
      <ContactColumn />
      <FooterColumn title={footerSectionTitles.newsletter}>
        <NewsletterForm />
      </FooterColumn>
    </div>
  )
}

export function Footer() {
  return (
    <footer id="contact" className="w-full bg-emerald-deep text-white">
      {/* Full-width main footer */}
      <div className="w-full border-b border-white/10 px-5 py-12 sm:px-8 md:py-14 lg:px-12 xl:px-16">
        <div className="hidden lg:block">
          <FooterMainGrid />
        </div>

        <div className="lg:hidden">
          <BrandColumn />
          <Separator className="my-8 bg-white/10" />
          <div className="grid gap-8 sm:grid-cols-2">
            <FooterLinkColumn
              title={footerSectionTitles.shop}
              items={[...footerNavColumns.shop]}
            />
            <FooterLinkColumn
              title={footerSectionTitles.sell}
              items={[...footerNavColumns.sell]}
            />
          </div>
          <Separator className="my-8 bg-white/10" />
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="company" className="border-white/10">
              <AccordionTrigger className="py-4 text-sm uppercase tracking-wider text-gold hover:no-underline">
                {footerSectionTitles.company}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="flex flex-col gap-2.5 pb-2">
                  {footerNavColumns.company.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="text-sm font-extralight text-white/70">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Separator className="my-8 bg-white/10" />
          <ContactColumn />
          <Separator className="my-8 bg-white/10" />
          <FooterColumn title={footerSectionTitles.newsletter}>
            <NewsletterForm />
          </FooterColumn>
        </div>
      </div>

      {/* Full-width bottom bar */}
      <div className="w-full px-5 py-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <p className="text-center text-xs text-white/60 sm:text-left">
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
          <nav
            aria-label="Legal"
            className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-white/60"
          >
            <a href={links.privacy} className="hover:text-white">
              Privacy Policy
            </a>
            <a href={links.terms} className="hover:text-white">
              Terms of Service
            </a>
            <a href={links.shipping} className="hover:text-white">
              Shipping & Returns
            </a>
          </nav>
          <PaymentMethods />
        </div>
      </div>
    </footer>
  )
}
