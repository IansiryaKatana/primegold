'use client'

import type { ReactNode } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { RevealBlock } from '@/components/motion'
import { AppLink } from '@/components/shared/AppLink'
import { Container } from '@/components/shared/primitives'
import { cn } from '@/lib/utils'

type Crumb = { label: string; href?: string }

type PageHeroProps = {
  title: string
  subtitle?: string
  crumbs: Crumb[]
  children?: ReactNode
  className?: string
}

export function PageHero({ title, subtitle, crumbs, children, className }: PageHeroProps) {
  return (
    <section className={cn('page-hero relative overflow-hidden py-12 md:py-16 lg:py-20', className)}>
      <div className="page-hero__backdrop" aria-hidden />
      <div className="page-hero__mesh" aria-hidden />
      <div className="page-hero__glow page-hero__glow--primary" aria-hidden />
      <div className="page-hero__glow page-hero__glow--secondary" aria-hidden />
      <div className="page-hero__rule" aria-hidden />

      <Container className="relative z-10">
        <RevealBlock scroll={false} delay={0.05}>
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              {crumbs.map((crumb, i) => (
                <span key={crumb.label} className="contents">
                  {i > 0 && <BreadcrumbSeparator className="text-white/35" />}
                  <BreadcrumbItem>
                    {crumb.href ? (
                      <BreadcrumbLink asChild>
                        <AppLink href={crumb.href} className="text-white/65 hover:text-white">
                          {crumb.label}
                        </AppLink>
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage className="text-gold">{crumb.label}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                </span>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </RevealBlock>

        <RevealBlock scroll={false}>
          <div className="page-hero__accent" aria-hidden />
          <h1 className="max-w-3xl text-heading-inverse">{title}</h1>
        </RevealBlock>

        {subtitle && (
          <RevealBlock scroll={false} delay={0.2} className="mt-4 max-w-2xl">
            <p className="text-desc-inverse">{subtitle}</p>
          </RevealBlock>
        )}

        {children && (
          <RevealBlock scroll={false} delay={0.35} className="mt-8 flex flex-wrap items-center gap-3">
            {children}
          </RevealBlock>
        )}
      </Container>
    </section>
  )
}
