import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { RevealBlock, RevealText } from '@/components/motion'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  title: string
  subtitle?: string
  className?: string
  align?: 'center' | 'left'
}

export function SectionHeading({
  title,
  subtitle,
  className,
  align = 'center',
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-10 flex flex-col gap-3',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      <RevealText as="h2" className="text-heading text-primary-text">
        {title}
      </RevealText>
      {subtitle && (
        <RevealBlock delay={0.15} className="max-w-2xl">
          <p className="text-desc">{subtitle}</p>
        </RevealBlock>
      )}
    </div>
  )
}

type TrustBadgeProps = {
  icon: LucideIcon
  label: string
}

export function TrustBadge({ icon: Icon, label }: TrustBadgeProps) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-cream">
        <Icon className="size-5 text-gold" />
      </div>
      <span className="text-sm text-primary-text md:text-base">{label}</span>
    </div>
  )
}

type RatingStarsProps = {
  rating: number
  className?: string
}

export function RatingStars({ rating, className }: RatingStarsProps) {
  return (
    <div className={cn('flex gap-0.5', className)}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={cn(
            'size-4',
            i < rating ? 'fill-gold text-gold' : 'fill-warm-border text-warm-border',
          )}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export function Container({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('mx-auto w-full min-w-0 max-w-7xl px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  )
}

type FormFieldProps = {
  label: string
  htmlFor?: string
  children: ReactNode
  className?: string
  labelClassName?: string
}

/** Label + control stack with consistent spacing for aligned form rows */
export function FormField({
  label,
  htmlFor,
  children,
  className,
  labelClassName,
}: FormFieldProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <Label htmlFor={htmlFor} className={labelClassName}>
        {label}
      </Label>
      {children}
    </div>
  )
}
