'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { AppLink } from '@/components/shared/AppLink'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { useCartStore, useCartHydrated } from '@/store/cart'
import { CartLineItem } from '@/components/cart/CartLineItem'
import { CartSummary } from '@/components/cart/CartSummary'
import { links } from '@/lib/links'
import { AnimatePresence, motion } from 'framer-motion'

export function CartDrawer() {
  const lines = useCartStore((s) => s.lines)
  const updateQty = useCartStore((s) => s.updateQty)
  const removeItem = useCartStore((s) => s.removeItem)
  const total = useCartStore((s) => s.total)
  const count = useCartStore((s) => s.count)
  const drawerOpen = useCartStore((s) => s.drawerOpen)
  const setDrawerOpen = useCartStore((s) => s.setDrawerOpen)
  const openDrawer = useCartStore((s) => s.openDrawer)
  const hydrated = useCartHydrated()
  const itemCount = hydrated ? count() : 0
  const cartLines = hydrated ? lines : []

  return (
    <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="relative text-white hover:bg-white/10"
        onClick={openDrawer}
        aria-label="Open cart"
      >
        <ShoppingCart className="size-5" />
        {itemCount > 0 && (
          <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-gold text-[10px] text-emerald-deep">
            {itemCount}
          </span>
        )}
      </Button>
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b border-warm-border px-6 py-4">
          <SheetTitle>Your Cart ({itemCount})</SheetTitle>
        </SheetHeader>

        <div className="flex flex-1 flex-col overflow-y-auto px-6 py-4">
          <AnimatePresence mode="popLayout">
            {cartLines.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-1 flex-col items-center justify-center gap-4 py-12 text-center"
              >
                <ShoppingCart className="size-12 text-muted-text/40" />
                <p className="text-sm text-muted-text">Your cart is empty.</p>
                <Button variant="emerald" asChild onClick={() => setDrawerOpen(false)}>
                  <AppLink href={links.shop}>Browse Products</AppLink>
                </Button>
              </motion.div>
            ) : (
              <div className="flex flex-col gap-4">
                {cartLines.map((line) => (
                  <motion.div
                    key={line.productId}
                    layout
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                  >
                    <CartLineItem
                      line={line}
                      onUpdateQty={updateQty}
                      onRemove={removeItem}
                      compact
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        {cartLines.length > 0 && (
          <div className="border-t border-warm-border px-6 py-4">
            <CartSummary
              subtotal={total()}
              itemCount={itemCount}
              ctaLabel="View Cart"
              ctaHref={links.cart}
            />
            <Button
              variant="outlineGold"
              className="mt-2 w-full"
              onClick={() => setDrawerOpen(false)}
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
