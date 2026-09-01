'use client'

import { Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type QuantityStepperProps = {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  className?: string
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  className,
}: QuantityStepperProps) {
  return (
    <div className={cn('surface-inset inline-flex items-center overflow-hidden', className)}>
      <Button
        type="button"
        variant="ghostDark"
        size="icon"
        className="size-10 rounded-none"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        aria-label="Decrease quantity"
      >
        <Minus className="size-4" />
      </Button>
      <span className="min-w-10 text-center text-base tabular-nums text-primary-text">{value}</span>
      <Button
        type="button"
        variant="ghostDark"
        size="icon"
        className="size-10 rounded-none"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        aria-label="Increase quantity"
      >
        <Plus className="size-4" />
      </Button>
    </div>
  )
}
