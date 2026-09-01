import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-normal transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 disabled:pointer-events-none disabled:opacity-50 md:text-base [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-emerald-deep text-white hover:bg-emerald-hover',
        gold: 'bg-gold-surface text-emerald-deep hover:bg-gold-soft hover:text-emerald-deep shadow-md hover:shadow-lg hover:scale-[1.02]',
        emerald: 'bg-emerald-deep text-white hover:bg-emerald-hover',
        outline:
          'border border-warm-border bg-white text-primary-text hover:bg-cream',
        outlineGold: 'border border-gold text-gold hover:bg-gold/10',
        ghost: 'text-white hover:bg-white/10',
        ghostDark: 'text-primary-text hover:bg-cream',
        secondary: 'bg-cream text-primary-text hover:bg-warm-border/50',
        link: 'text-gold underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-5 py-2',
        sm: 'h-8 rounded-sm px-3',
        lg: 'h-12 rounded-sm px-8',
        xl: 'h-14 rounded-sm px-10',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
