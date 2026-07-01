'use client'

import { toast } from 'sonner'
import type { Product } from '@/lib/types'
import type { BulkTier } from '@/lib/cart'
import { useCartStore } from '@/store/cart'
import { Button } from '@/components/ui/button'
import { shopCopy } from '@/data/copy'
import { cn } from '@/lib/utils'

type AddToCartButtonProps = {
  product: Product
  qty?: number
  bulkTiers?: BulkTier[]
  variant?: 'emerald' | 'gold' | 'outlineGold'
  size?: 'default' | 'sm' | 'lg'
  className?: string
  label?: string
  showToast?: boolean
}

export function AddToCartButton({
  product,
  qty = 1,
  bulkTiers,
  variant = 'emerald',
  size = 'default',
  className,
  label = shopCopy.addToCart,
  showToast = true,
}: AddToCartButtonProps) {
  const addItem = useCartStore((s) => s.addItem)

  function handleClick() {
    if (!product.inStock) {
      toast.error(shopCopy.outOfStock)
      return
    }
    addItem(product, { qty, bulkTiers, openDrawer: true })
    if (showToast) {
      toast.success(`${product.name} added to cart`)
    }
  }

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={cn(className)}
      disabled={!product.inStock}
      onClick={handleClick}
    >
      {product.inStock ? label : shopCopy.outOfStock}
    </Button>
  )
}
