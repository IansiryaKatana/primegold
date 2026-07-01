import type { Branch, ComparisonRow, PressLogo, Product, Testimonial } from '@/lib/types'
import { seedProducts, seedBranches } from '@/data/seed/catalog'

export const branches: Branch[] = seedBranches
export const products: Product[] = seedProducts

export const testimonials: Testimonial[] = [
  { id: '1', rating: 5, quote: 'Sold my grandmother\'s jewelry and received a fair, transparent offer. Professional from start to finish.', name: 'Sarah M.' },
  { id: '2', rating: 5, quote: 'Best prices I found after comparing three dealers. The appointment process was quick and confidential.', name: 'James R.' },
  { id: '3', rating: 5, quote: 'I buy gold bars monthly for my portfolio. Prime Gold always delivers authentic products on time.', name: 'David L.' },
  { id: '4', rating: 5, quote: 'The staff explained every step of the appraisal. I felt completely secure throughout the transaction.', name: 'Maria G.' },
  { id: '5', rating: 5, quote: 'Nationwide locations made it easy to find a branch near me. Excellent customer service.', name: 'Robert K.' },
]

export const pressLogos: PressLogo[] = [
  { id: '1', name: 'Inc.', href: 'https://www.inc.com', logoUrl: '/press/inc.svg' },
  { id: '2', name: 'Forbes', href: 'https://www.forbes.com', logoUrl: '/press/forbes.svg' },
  { id: '3', name: 'Yahoo Finance', href: 'https://finance.yahoo.com', logoUrl: '/press/yahoo-finance.svg' },
  { id: '4', name: 'MarketWatch', href: 'https://www.marketwatch.com', logoUrl: '/press/marketwatch.svg' },
  { id: '5', name: 'Business Insider', href: 'https://www.businessinsider.com', logoUrl: '/press/business-insider.svg' },
  { id: '6', name: 'Bloomberg', href: 'https://www.bloomberg.com', logoUrl: '/press/bloomberg.svg' },
]

export const comparisonRows: ComparisonRow[] = [
  { feature: 'Best Price Guarantee', primeGold: true, otherDealers: false },
  { feature: 'Free & Transparent Appraisals', primeGold: true, otherDealers: false },
  { feature: 'Secure & Insured Transactions', primeGold: true, otherDealers: false },
  { feature: 'Nationwide Locations', primeGold: true, otherDealers: false },
  { feature: '5-Star Customer Ratings', primeGold: true, otherDealers: false },
]
