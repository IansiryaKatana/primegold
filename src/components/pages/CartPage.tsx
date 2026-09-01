'use client'

import { MotionSection, RevealBlock } from '@/components/motion'
import { AppLink } from '@/components/shared/AppLink'
import { Container } from '@/components/shared/primitives'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CartLineItem } from '@/components/cart/CartLineItem'
import { CartSummary } from '@/components/cart/CartSummary'
import { useCartStore } from '@/store/cart'
import { links } from '@/lib/links'
import { metaCopy } from '@/data/copy/meta'
import { ShoppingBag } from 'lucide-react'

export function CartPage() {
  const lines = useCartStore((s) => s.lines)
  const updateQty = useCartStore((s) => s.updateQty)
  const removeItem = useCartStore((s) => s.removeItem)
  const total = useCartStore((s) => s.total)
  const count = useCartStore((s) => s.count)

  return (
    <>
      <title>{metaCopy.cart.title}</title>
      <MotionSection tier="d" className="bg-cream py-10 md:py-14">
        <Container>
          <RevealBlock scroll={false} className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h1 className="text-heading text-primary-text">Your Cart</h1>
              <p className="mt-1 text-sm text-muted-text">
                {count() > 0
                  ? `${count()} item${count() === 1 ? '' : 's'} in your cart`
                  : 'Review items before checkout'}
              </p>
            </div>
            {lines.length > 0 && (
              <Button variant="outlineGold" asChild className="hidden sm:inline-flex">
                <AppLink href={links.shop}>Continue Shopping</AppLink>
              </Button>
            )}
          </RevealBlock>

          {lines.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center gap-4 py-16 text-center">
                <ShoppingBag className="size-14 text-muted-text/30" />
                <p className="text-muted-text">Your cart is empty.</p>
                <Button variant="emerald" asChild>
                  <AppLink href={links.shop}>Browse Products</AppLink>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-8 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <CardContent className="flex flex-col gap-4 p-6">
                  {lines.map((line) => (
                    <CartLineItem
                      key={line.productId}
                      line={line}
                      onUpdateQty={updateQty}
                      onRemove={removeItem}
                    />
                  ))}
                </CardContent>
              </Card>

              <CartSummary
                subtotal={total()}
                itemCount={count()}
                ctaLabel="Proceed to Checkout"
                ctaHref={links.checkout}
              />
            </div>
          )}
        </Container>
      </MotionSection>
    </>
  )
}
