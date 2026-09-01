'use client'

import { useRef } from 'react'
import {
  BadgeCheck,
  Clock,
  LockKeyhole,
  ShieldCheck,
  Star,
  type LucideIcon,
} from 'lucide-react'
import { homeCopy } from '@/data/copy'
import { MotionSection, RevealBlock, StaggerGrid } from '@/components/motion'
import { useGSAP, scrollReveal } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { TrustBadge, Container } from '@/components/shared/primitives'
import { cn } from '@/lib/utils'

const badgeIcons = [ShieldCheck, Star, Clock, LockKeyhole]

export function TrustIntro() {
  const copy = homeCopy.trustIntro
  const badges = copy.badges.map((label, i) => ({
    icon: badgeIcons[i] ?? ShieldCheck,
    label,
  }))
  return (
    <MotionSection tier="b" className="bg-white py-16 md:py-20">
      <Container>
        <div className="flex flex-col items-center text-center">
          <RevealBlock className="mb-6">
            <h2 className="text-heading text-primary-text">
              The best way to{' '}
              <span className="text-gold">buy</span> and{' '}
              <span className="text-gold">sell</span> gold.
            </h2>
          </RevealBlock>

          <RevealBlock className="mb-10 max-w-2xl">
            <p className="text-desc">{copy.body}</p>
          </RevealBlock>

          <StaggerGrid
            className="grid w-full max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4"
            stagger={0.08}
          >
            {badges.map((badge) => (
              <TrustBadge key={badge.label} {...badge} />
            ))}
          </StaggerGrid>
        </div>
      </Container>
    </MotionSection>
  )
}

const metricIcons = [BadgeCheck, Clock, ShieldCheck, Star, LockKeyhole, Star]

type Metric = {
  icon: LucideIcon
  label: string
}

function MetricItem({
  metric,
  showDivider = false,
  className,
}: {
  metric: Metric
  showDivider?: boolean
  className?: string
}) {
  const Icon = metric.icon
  return (
    <div className={cn('flex shrink-0 items-center', className)}>
      <div className="flex items-center gap-2 px-4 text-center">
        <Icon className="size-4 shrink-0 text-gold" aria-hidden />
        <span className="text-sm text-white">{metric.label}</span>
      </div>
      {showDivider && <div className="h-6 w-px shrink-0 bg-gold/30" aria-hidden />}
    </div>
  )
}

export function TrustMetricStrip() {
  const gridRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const metrics: Metric[] = homeCopy.trustMetrics.map((label, i) => ({
    icon: metricIcons[i] ?? BadgeCheck,
    label,
  }))

  const marqueeMetrics = [...metrics, ...metrics]

  useGSAP(
    () => {
      if (!gridRef.current || reduced) return
      scrollReveal(gridRef.current.children, {
        stagger: 0.06,
        scrollTrigger: { trigger: gridRef.current, once: true },
      })
    },
    { scope: gridRef, dependencies: [reduced] },
  )

  return (
    <section className="bg-emerald-deep py-4" aria-label="Trust highlights">
      <div className="overflow-hidden lg:hidden">
        <div className="trust-marquee-track items-center">
          {marqueeMetrics.map((metric, i) => (
            <MetricItem
              key={`${metric.label}-${i}`}
              metric={metric}
              showDivider={i < marqueeMetrics.length - 1}
            />
          ))}
        </div>
      </div>

      <div
        ref={gridRef}
        className="hidden w-full grid-cols-3 items-center px-4 lg:grid xl:grid-cols-6 xl:px-16"
      >
        {metrics.map((metric, i) => (
          <div
            key={metric.label}
            className={cn(
              'flex items-center justify-center px-1',
              i < metrics.length - 1 && 'xl:border-r xl:border-gold/30',
            )}
          >
            <MetricItem metric={metric} className="px-2 [&_span]:text-xs xl:[&_span]:text-sm" />
          </div>
        ))}
      </div>
    </section>
  )
}
