import { useEffect, useState } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/lib/types'
import { resolveUnitPrice, type BulkTier } from '@/lib/cart'

export type CartLine = {
  productId: string
  slug: string
  name: string
  basePrice: number
  price: number
  qty: number
  imageUrl: string
  bulkTiers?: BulkTier[]
}

type AddItemOptions = {
  qty?: number
  bulkTiers?: BulkTier[]
  openDrawer?: boolean
}

type CartState = {
  lines: CartLine[]
  drawerOpen: boolean
  addItem: (product: Product, options?: AddItemOptions) => void
  removeItem: (productId: string) => void
  updateQty: (productId: string, qty: number) => void
  clear: () => void
  setDrawerOpen: (open: boolean) => void
  openDrawer: () => void
  total: () => number
  count: () => number
}

function lineFromProduct(
  product: Product,
  qty: number,
  bulkTiers?: BulkTier[],
): CartLine {
  const basePrice = product.price
  const price = resolveUnitPrice(basePrice, qty, bulkTiers)
  return {
    productId: product.id,
    slug: product.slug,
    name: product.name,
    basePrice,
    price,
    qty,
    imageUrl: product.imageUrl,
    bulkTiers,
  }
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      drawerOpen: false,
      addItem: (product, options = {}) => {
        const qty = options.qty ?? 1
        const bulkTiers = options.bulkTiers
        set((state) => {
          const existing = state.lines.find((l) => l.productId === product.id)
          if (existing) {
            const newQty = existing.qty + qty
            return {
              lines: state.lines.map((l) =>
                l.productId === product.id
                  ? {
                      ...l,
                      qty: newQty,
                      price: resolveUnitPrice(l.basePrice, newQty, l.bulkTiers),
                    }
                  : l,
              ),
              drawerOpen: options.openDrawer !== false,
            }
          }
          return {
            lines: [...state.lines, lineFromProduct(product, qty, bulkTiers)],
            drawerOpen: options.openDrawer !== false,
          }
        })
      },
      removeItem: (productId) =>
        set((state) => ({ lines: state.lines.filter((l) => l.productId !== productId) })),
      updateQty: (productId, qty) => {
        if (qty < 1) {
          get().removeItem(productId)
          return
        }
        set((state) => ({
          lines: state.lines.map((l) =>
            l.productId === productId
              ? { ...l, qty, price: resolveUnitPrice(l.basePrice, qty, l.bulkTiers) }
              : l,
          ),
        }))
      },
      clear: () => set({ lines: [] }),
      setDrawerOpen: (open) => set({ drawerOpen: open }),
      openDrawer: () => set({ drawerOpen: true }),
      total: () => get().lines.reduce((sum, l) => sum + l.price * l.qty, 0),
      count: () => get().lines.reduce((sum, l) => sum + l.qty, 0),
    }),
    {
      name: 'prime-gold-cart',
      partialize: (state) => ({ lines: state.lines }),
    },
  ),
)

export function useCartHydrated() {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const persist = useCartStore.persist
    if (!persist) {
      setHydrated(true)
      return
    }

    setHydrated(persist.hasHydrated())

    return persist.onFinishHydration(() => {
      setHydrated(true)
    })
  }, [])

  return hydrated
}
