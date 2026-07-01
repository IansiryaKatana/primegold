export type BulkTier = { minQty: number; price: number }

export function resolveUnitPrice(
  basePrice: number,
  qty: number,
  bulkTiers?: BulkTier[],
): number {
  if (!bulkTiers?.length) return basePrice
  const sorted = [...bulkTiers].sort((a, b) => b.minQty - a.minQty)
  const tier = sorted.find((t) => qty >= t.minQty)
  return tier?.price ?? basePrice
}

export const SHIPPING_RATES = {
  standard: { label: 'Standard Insured Shipping', price: 25 },
  premium: { label: 'Premium Insured Shipping', price: 35 },
} as const
