export type MarketTicker = {
  goldPrice: number
  silverPrice: number
  goldChangePct: number | null
  silverChangePct: number | null
  source: 'live' | 'snapshot' | 'fallback'
  marketStatus: 'open' | 'closed'
  marketHoursLabel: string
  updatedAt: string
}

export type Product = {
  id: string
  name: string
  metalType: 'gold' | 'silver' | 'platinum'
  weight: string
  purity: string
  price: number
  currency: 'USD'
  imageUrl: string
  slug: string
  inStock: boolean
}

export type InvestmentReturnResult = {
  initialAmount: number
  projectedValue: number
  estimatedReturn: number
  percentageReturn: number
  disclaimer: string
}

export type InsightArticle = {
  id: string
  title: string
  imageUrl: string
  slug: string
}

export type Branch = {
  id: string
  name: string
  address: string
  city: string
  state: string
  country: string
  latitude: number
  longitude: number
  phone: string
  openingHours: string
  services: string[]
}

export type Testimonial = {
  id: string
  rating: number
  quote: string
  name: string
}

export type FAQ = {
  id: string
  question: string
  answer: string
}

export type PressLogo = {
  id: string
  name: string
  logoUrl?: string
  href?: string
}

export type Appointment = {
  id: string
  serviceType: 'sell_gold' | 'sell_jewelry' | 'buy_gold' | 'buy_silver' | 'coins'
  firstName: string
  lastName: string
  email: string
  phone: string
  preferredDate: string
  preferredTime: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  createdAt: string
}

export type ComparisonRow = {
  feature: string
  primeGold: boolean
  otherDealers: boolean
}
