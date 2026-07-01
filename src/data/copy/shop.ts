export const shopCopy = {
  title: 'Shop Precious Metals',
  subtitle: 'Browse investment-grade gold bars, silver products, and bullion coins.',
  filters: {
    metal: 'Metal Type',
    all: 'All Metals',
    gold: 'Gold',
    silver: 'Silver',
    sort: 'Sort By',
    sortFeatured: 'Featured',
    sortPriceAsc: 'Price: Low to High',
    sortPriceDesc: 'Price: High to Low',
    sortName: 'Name A–Z',
  },
  empty: 'No products match your filters. Try adjusting your search.',
  searchPlaceholder: 'Search products…',
  addToCart: 'Add to Cart',
  viewProduct: 'View Product',
  inStock: 'In Stock',
  outOfStock: 'Out of Stock',
  bulkPricing: 'Bulk Pricing',
  related: 'You May Also Like',
  specs: 'Specifications',
} as const

export const collectionCopy: Record<string, { title: string; description: string }> = {
  'gold-bars': {
    title: 'Gold Bars',
    description: 'Investment-grade gold bars in sizes from 1 gram to 10 troy ounces, sourced from LBMA-approved refineries.',
  },
  'gold-coins': {
    title: 'Gold Coins',
    description: 'Popular gold coins and bullion rounds for collectors and long-term investors.',
  },
  silver: {
    title: 'Silver Bars & Coins',
    description: 'Silver products at competitive spot-based pricing with insured shipping nationwide.',
  },
}
