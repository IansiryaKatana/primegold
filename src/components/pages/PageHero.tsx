import type { ReactNode } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
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
    <section className={cn('bg-emerald-deep py-12 md:py-16', className)}>
      <Container>
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            {crumbs.map((crumb, i) => (
              <span key={crumb.label} className="contents">
                {i > 0 && <BreadcrumbSeparator className="text-white/40" />}
                <BreadcrumbItem>
                  {crumb.href ? (
                    <BreadcrumbLink
                      href={crumb.href}
                      className="text-white/70 hover:text-white"
                    >
                      {crumb.label}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage className="text-gold">{crumb.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </span>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="max-w-3xl text-heading-inverse">{title}</h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-base font-extralight leading-relaxed text-white/80 md:text-lg">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-8 flex flex-wrap items-center gap-3">{children}</div>}
      </Container>
    </section>
  )
}
