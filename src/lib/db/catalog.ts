import { seedProducts, seedBranches } from '@/data/seed/catalog'
import { testimonials, pressLogos, comparisonRows } from '@/data/content'
import type { Product } from '@/lib/types'

export const catalogProducts: Product[] = seedProducts
export const branches = seedBranches

export function getProductBySlug(slug: string): Product | undefined {
  return catalogProducts.find((p) => p.slug === slug)
}

export function getProductsByMetal(metal?: string): Product[] {
  if (!metal || metal === 'all') return catalogProducts
  return catalogProducts.filter((p) => p.metalType === metal)
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim()
  if (!q) return catalogProducts
  return catalogProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.metalType.includes(q) ||
      p.weight.toLowerCase().includes(q),
  )
}

export function getRelatedProducts(slug: string, limit = 4): Product[] {
  const product = getProductBySlug(slug)
  if (!product) return catalogProducts.slice(0, limit)
  return catalogProducts
    .filter((p) => p.slug !== slug && p.metalType === product.metalType)
    .slice(0, limit)
}
