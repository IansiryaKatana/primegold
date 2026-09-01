'use client'

import type { Product } from '@/lib/types'
import { AppLink } from '@/components/shared/AppLink'
import { productLink } from '@/lib/links'
import { formatStartingPrice } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { shopCopy } from '@/data/copy'
import { AddToCartButton } from '@/components/cart/AddToCartButton'
import { Button } from '@/components/ui/button'

type ProductCardProps = {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <article className={cn('group flex flex-col', className)}>
      <AppLink href={productLink(product.slug)} className="relative aspect-square w-full overflow-hidden bg-image-surface">
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </AppLink>

      <h3 className="mt-3 text-left text-base text-navy md:text-lg">
        <AppLink href={productLink(product.slug)} className="hover:text-emerald-deep">
          {product.name}
        </AppLink>
      </h3>

      <div className="surface-highlight mt-2 flex w-full items-center justify-center px-3 py-2.5">
        <p className="text-sm text-navy md:text-base">
          Starting at{' '}
          <span className="text-lg md:text-xl">{formatStartingPrice(product.price)}</span>
        </p>
      </div>

      <div className="mt-2 flex flex-col gap-2 sm:grid sm:grid-cols-2 sm:items-stretch">
        <AddToCartButton
          product={product}
          variant="outlineGold"
          size="default"
          className="h-10 w-full whitespace-normal text-center text-xs leading-tight sm:text-sm"
          label="Add to Cart"
        />
        <Button
          variant="emerald"
          size="default"
          className="h-10 w-full whitespace-normal text-center text-xs leading-tight sm:text-sm"
          asChild
        >
          <AppLink href={productLink(product.slug)}>{shopCopy.viewProduct}</AppLink>
        </Button>
      </div>
    </article>
  )
}
