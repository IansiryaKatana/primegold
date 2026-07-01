import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-emerald-deep text-white',
        gold: 'border-transparent bg-gold/15 text-gold',
        outline: 'border-warm-border text-primary-text',
        secondary: 'border-transparent bg-cream text-primary-text',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
