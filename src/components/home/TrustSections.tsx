import { motion } from 'framer-motion'
import {
  BadgeCheck,
  Clock,
  LockKeyhole,
  ShieldCheck,
  Star,
  type LucideIcon,
} from 'lucide-react'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { homeCopy } from '@/data/copy'
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
    <section className="bg-white py-16 md:py-20">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col items-center text-center"
        >
          <motion.h2 variants={fadeUp} className="mb-6 text-heading text-primary-text">
            The best way to{' '}
            <span className="text-gold">buy</span> and{' '}
            <span className="text-gold">sell</span> gold.
          </motion.h2>

          <motion.p variants={fadeUp} className="mb-10 max-w-2xl text-desc">
            {copy.body}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="grid w-full max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4"
          >
            {badges.map((badge) => (
              <TrustBadge key={badge.label} {...badge} />
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
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
  const metrics: Metric[] = homeCopy.trustMetrics.map((label, i) => ({
    icon: metricIcons[i] ?? BadgeCheck,
    label,
  }))

  const marqueeMetrics = [...metrics, ...metrics]

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

      <div className="hidden w-full grid-cols-3 items-center px-4 lg:grid xl:grid-cols-6 xl:px-16">
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
