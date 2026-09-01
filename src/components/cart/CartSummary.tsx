'use client'

import { ShieldCheck, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AppLink } from '@/components/shared/AppLink'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { formatCurrency } from '@/lib/utils'
import { links } from '@/lib/links'
import { SHIPPING_RATES } from '@/lib/cart'

type CartSummaryProps = {
  subtotal: number
  shipping?: 'standard' | 'premium'
  onShippingChange?: (method: 'standard' | 'premium') => void
  showShippingSelect?: boolean
  ctaLabel?: string
  ctaHref?: string
  onCheckout?: () => void
  loading?: boolean
  itemCount: number
}

export function CartSummary({
  subtotal,
  shipping = 'standard',
  onShippingChange,
  showShippingSelect = false,
  ctaLabel = 'Proceed to Checkout',
  ctaHref,
  onCheckout,
  loading,
  itemCount,
}: CartSummaryProps) {
  const shippingCost = itemCount > 0 ? SHIPPING_RATES[shipping].price : 0
  const total = subtotal + shippingCost

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg text-primary-text">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {showShippingSelect && onShippingChange && itemCount > 0 && (
          <div className="flex flex-col gap-2">
            <p className="text-sm text-primary-text">Shipping method</p>
            {(Object.keys(SHIPPING_RATES) as Array<keyof typeof SHIPPING_RATES>).map((key) => (
              <label
                key={key}
                className="surface-inset flex cursor-pointer items-center gap-3 p-3 has-[:checked]:bg-cream/40 has-[:checked]:ring-gold/30"
              >
                <input
                  type="radio"
                  name="shipping"
                  value={key}
                  checked={shipping === key}
                  onChange={() => onShippingChange(key)}
                  className="accent-emerald-deep"
                />
                <div className="flex flex-1 items-center justify-between gap-2 text-sm">
                  <span className="flex items-center gap-2 text-primary-text">
                    <Truck className="size-4 text-emerald-deep" />
                    {SHIPPING_RATES[key].label}
                  </span>
                  <span>{formatCurrency(SHIPPING_RATES[key].price)}</span>
                </div>
              </label>
            ))}
          </div>
        )}

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-text">Subtotal ({itemCount} items)</span>
            <span className="tabular-nums">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-text">Shipping</span>
            <span className="tabular-nums">{formatCurrency(shippingCost)}</span>
          </div>
          <Separator />
          <div className="flex justify-between text-base text-primary-text">
            <span>Total</span>
            <span className="text-gold tabular-nums">{formatCurrency(total)}</span>
          </div>
        </div>

        <div className="surface-callout flex items-start gap-2 p-3 text-sm text-primary-text">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-emerald-deep" />
          <span>Secure checkout. Identity verification required before shipment. Prices lock at payment.</span>
        </div>

        {ctaHref ? (
          <Button variant="emerald" className="w-full" size="lg" asChild disabled={itemCount === 0}>
            <AppLink href={itemCount > 0 && ctaHref ? ctaHref : links.shop}>{ctaLabel}</AppLink>
          </Button>
        ) : (
          <Button
            variant="emerald"
            className="w-full"
            size="lg"
            disabled={loading || itemCount === 0}
            onClick={onCheckout}
          >
            {loading ? 'Processing…' : ctaLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
