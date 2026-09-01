'use client'

import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { QuantityStepper } from '@/components/cart/QuantityStepper'
import { formatCurrency } from '@/lib/utils'
import { AppLink } from '@/components/shared/AppLink'
import { productLink } from '@/lib/links'
import type { CartLine } from '@/store/cart'

type CartLineItemProps = {
  line: CartLine
  onUpdateQty: (productId: string, qty: number) => void
  onRemove: (productId: string) => void
  compact?: boolean
}

export function CartLineItem({ line, onUpdateQty, onRemove, compact }: CartLineItemProps) {
  const lineTotal = line.price * line.qty

  return (
    <div className="flex gap-4 border-b border-warm-border pb-4 last:border-0 last:pb-0">
      <AppLink
        href={productLink(line.slug)}
        className="relative aspect-[3/4] w-20 shrink-0 overflow-hidden rounded-sm bg-image-surface sm:w-24"
      >
        <img src={line.imageUrl} alt="" className="absolute inset-0 size-full object-cover" />
      </AppLink>
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
        <div className="flex items-start justify-between gap-2">
          <AppLink
            href={productLink(line.slug)}
            className="text-sm text-primary-text hover:text-emerald-deep sm:text-base"
          >
            {line.name}
          </AppLink>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8 shrink-0 text-muted-text hover:text-red-600"
            onClick={() => onRemove(line.productId)}
            aria-label={`Remove ${line.name}`}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
        <p className="text-sm text-muted-text">
          {formatCurrency(line.price)} each
          {line.price < line.basePrice && (
            <span className="ml-1 text-emerald-deep">Bulk rate applied</span>
          )}
        </p>
        <div className="flex items-center justify-between gap-3">
          <QuantityStepper
            value={line.qty}
            onChange={(qty) => onUpdateQty(line.productId, qty)}
            className={compact ? 'scale-90 origin-left' : undefined}
          />
          <p className="text-base text-gold tabular-nums">{formatCurrency(lineTotal)}</p>
        </div>
      </div>
    </div>
  )
}
