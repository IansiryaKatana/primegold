import type { Branch, Product } from '@/lib/types'

const productImage = (index: 1 | 2 | 3 | 4 | 5) =>
  `/product-images/prime-gold-merch-${index}.png`

export const seedProducts: Product[] = [
  { id: '1', name: '1 gram Gold Bar', metalType: 'gold', weight: '1g', purity: '99.99% Pure', price: 210, currency: 'USD', imageUrl: productImage(5), slug: '1-gram-gold-bar', inStock: true },
  { id: '2', name: '2.5 gram Gold Bar', metalType: 'gold', weight: '2.5g', purity: '99.99% Pure', price: 383, currency: 'USD', imageUrl: productImage(5), slug: '2-5-gram-gold-bar', inStock: true },
  { id: '3', name: '5 gram Gold Bar', metalType: 'gold', weight: '5g', purity: '99.99% Pure', price: 680, currency: 'USD', imageUrl: productImage(5), slug: '5-gram-gold-bar', inStock: true },
  { id: '4', name: '10 gram Gold Bar', metalType: 'gold', weight: '10g', purity: '99.99% Pure', price: 1350, currency: 'USD', imageUrl: productImage(5), slug: '10-gram-gold-bar', inStock: true },
  { id: '5', name: '20 gram Gold Bar', metalType: 'gold', weight: '20g', purity: '99.99% Pure', price: 2717, currency: 'USD', imageUrl: productImage(2), slug: '20-gram-gold-bar', inStock: true },
  { id: '6', name: '1 Oz Gold Bar', metalType: 'gold', weight: '1 oz', purity: '99.99% Pure', price: 4192, currency: 'USD', imageUrl: productImage(4), slug: '1-oz-gold-bar', inStock: true },
  { id: '7', name: '10 Oz Gold Bar', metalType: 'gold', weight: '10 oz', purity: '99.99% Pure', price: 41500, currency: 'USD', imageUrl: productImage(1), slug: '10-oz-gold-bar', inStock: true },
  { id: '8', name: '1 Oz Silver Bar', metalType: 'silver', weight: '1 oz', purity: '99.9% Pure', price: 32, currency: 'USD', imageUrl: productImage(3), slug: '1-oz-silver-bar', inStock: true },
  { id: '9', name: '10 Oz Silver Bar', metalType: 'silver', weight: '10 oz', purity: '99.9% Pure', price: 310, currency: 'USD', imageUrl: productImage(3), slug: '10-oz-silver-bar', inStock: true },
  { id: '10', name: '100 Oz Silver Bar', metalType: 'silver', weight: '100 oz', purity: '99.9% Pure', price: 2950, currency: 'USD', imageUrl: productImage(1), slug: '100-oz-silver-bar', inStock: true },
  { id: '11', name: '1 Oz Gold Coin — Bullion Round', metalType: 'gold', weight: '1 oz', purity: '99.99% Pure', price: 4250, currency: 'USD', imageUrl: productImage(5), slug: '1-oz-gold-coin', inStock: true },
  { id: '12', name: '1 Oz Silver Coin — Bullion Round', metalType: 'silver', weight: '1 oz', purity: '99.9% Pure', price: 35, currency: 'USD', imageUrl: productImage(3), slug: '1-oz-silver-coin', inStock: true },
  { id: '13', name: '50 gram Gold Bar', metalType: 'gold', weight: '50g', purity: '99.99% Pure', price: 6800, currency: 'USD', imageUrl: productImage(3), slug: '50-gram-gold-bar', inStock: true },
  { id: '14', name: '100 gram Gold Bar', metalType: 'gold', weight: '100g', purity: '99.99% Pure', price: 13500, currency: 'USD', imageUrl: productImage(4), slug: '100-gram-gold-bar', inStock: true },
  { id: '15', name: '1 Kilo Gold Bar', metalType: 'gold', weight: '1 kg', purity: '99.99% Pure', price: 135000, currency: 'USD', imageUrl: productImage(1), slug: '1-kilo-gold-bar', inStock: true },
  { id: '16', name: '1/2 Oz Gold Coin — Bullion Round', metalType: 'gold', weight: '1/2 oz', purity: '99.99% Pure', price: 2150, currency: 'USD', imageUrl: productImage(5), slug: 'half-oz-gold-coin', inStock: true },
  { id: '17', name: '5 Oz Silver Bar', metalType: 'silver', weight: '5 oz', purity: '99.9% Pure', price: 155, currency: 'USD', imageUrl: productImage(3), slug: '5-oz-silver-bar', inStock: true },
  { id: '18', name: '50 Oz Silver Bar', metalType: 'silver', weight: '50 oz', purity: '99.9% Pure', price: 1480, currency: 'USD', imageUrl: productImage(1), slug: '50-oz-silver-bar', inStock: true },
]

export const seedCollections = [
  { slug: 'gold-bars', title: 'Gold Bars', description: 'Investment-grade gold bars from trusted refineries.', productSlugs: ['1-gram-gold-bar', '2-5-gram-gold-bar', '5-gram-gold-bar', '10-gram-gold-bar', '20-gram-gold-bar', '1-oz-gold-bar', '10-oz-gold-bar', '50-gram-gold-bar', '100-gram-gold-bar', '1-kilo-gold-bar'] },
  { slug: 'gold-coins', title: 'Gold Coins', description: 'Popular gold coins for collectors and investors.', productSlugs: ['1-oz-gold-coin', 'half-oz-gold-coin'] },
  { slug: 'silver', title: 'Silver', description: 'Silver bars and coins at competitive spot-based pricing.', productSlugs: ['1-oz-silver-bar', '5-oz-silver-bar', '10-oz-silver-bar', '50-oz-silver-bar', '100-oz-silver-bar', '1-oz-silver-coin'] },
]

export const seedBranches: Branch[] = [
  { id: '1', name: 'Prime Gold Trading — Manhattan', address: '450 Lexington Ave', city: 'New York', state: 'NY', country: 'USA', latitude: 40.7549, longitude: -73.9754, phone: '(212) 555-0142', openingHours: 'Mon–Fri 9:30 AM – 5:30 PM', services: ['sell_gold', 'sell_jewelry', 'buy_gold'] },
  { id: '2', name: 'Prime Gold Trading — Los Angeles', address: '10250 Santa Monica Blvd', city: 'Los Angeles', state: 'CA', country: 'USA', latitude: 34.0594, longitude: -118.4194, phone: '(310) 555-0198', openingHours: 'Mon–Fri 9:30 AM – 5:30 PM', services: ['sell_gold', 'buy_gold', 'buy_silver'] },
  { id: '3', name: 'Prime Gold Trading — Chicago', address: '233 S Wacker Dr', city: 'Chicago', state: 'IL', country: 'USA', latitude: 41.8789, longitude: -87.6359, phone: '(312) 555-0167', openingHours: 'Mon–Fri 9:30 AM – 5:30 PM', services: ['sell_jewelry', 'coins', 'buy_gold'] },
  { id: '4', name: 'Prime Gold Trading — Houston', address: '1200 Smith St', city: 'Houston', state: 'TX', country: 'USA', latitude: 29.7573, longitude: -95.3698, phone: '(713) 555-0134', openingHours: 'Mon–Fri 9:30 AM – 5:30 PM', services: ['sell_gold', 'sell_jewelry', 'coins'] },
  { id: '5', name: 'Prime Gold Trading — Miami', address: '1395 Brickell Ave', city: 'Miami', state: 'FL', country: 'USA', latitude: 25.7617, longitude: -80.1918, phone: '(305) 555-0189', openingHours: 'Mon–Fri 9:30 AM – 5:30 PM', services: ['buy_gold', 'buy_silver', 'sell_jewelry'] },
]

export function branchSlug(city: string) {
  return `buy-sell-gold-${city.toLowerCase().replace(/\s+/g, '-')}`
}

export const seedBranchSlugs: Record<string, string> = {
  '1': 'buy-sell-gold-new-york',
  '2': 'buy-sell-gold-los-angeles',
  '3': 'buy-sell-gold-chicago',
  '4': 'buy-sell-gold-houston',
  '5': 'buy-sell-gold-miami',
}
