export const links = {
  home: '/',
  shop: '/shop',
  products: '/shop',
  collections: {
    goldBars: '/collections/gold-bars',
    goldCoins: '/collections/gold-coins',
    silver: '/collections/silver',
  },
  sell: '/sell',
  estimate: '/estimate',
  silver: '/collections/silver',
  calculator: '/calculator',
  insights: '/insights',
  locations: '/locations',
  about: '/about',
  contact: '/contact',
  faq: '/faq',
  press: '/press',
  testimonials: '/#testimonials',
  cart: '/cart',
  checkout: '/checkout',
  checkoutKyc: '/checkout/kyc',
  account: '/account',
  accountOrders: '/account/orders',
  login: '/account/login',
  register: '/account/register',
  orderLookup: '/order-lookup',
  privacy: '/privacy',
  terms: '/terms',
  shipping: '/shipping-returns',
} as const

export function productLink(slug: string) {
  return `/products/${slug}`
}

export function collectionLink(slug: string) {
  return `/collections/${slug}`
}

export function insightLink(slug: string) {
  return `/insights/${slug}`
}

export function locationLink(slug: string) {
  return `/locations/${slug}`
}

export type FooterLink = { label: string; href: string }

export const footerLinks: Record<string, FooterLink[]> = {
  shop: [
    { label: 'Gold Bars', href: links.collections.goldBars },
    { label: 'Silver Bars', href: links.collections.silver },
    { label: 'Gold Coins', href: links.collections.goldCoins },
    { label: 'All Products', href: links.shop },
    { label: 'Gift Cards', href: links.shop },
  ],
  sell: [
    { label: 'Sell Gold', href: links.sell },
    { label: 'Sell Silver', href: links.sell },
    { label: 'Sell Jewelry', href: links.sell },
    { label: 'Get an Estimate', href: links.estimate },
    { label: 'Book Appointment', href: links.locations },
  ],
  company: [
    { label: 'About Us', href: links.about },
    { label: 'Careers', href: links.contact },
    { label: 'Press', href: links.press },
    { label: 'Locations', href: links.locations },
    { label: 'Contact', href: links.contact },
  ],
  resources: [
    { label: 'Gold Guide', href: links.insights },
    { label: 'Silver Guide', href: links.collections.silver },
    { label: 'Investment Calculator', href: links.calculator },
    { label: 'Blog', href: links.insights },
    { label: 'FAQ', href: links.faq },
  ],
}

/** Desktop footer: resources distributed across Shop / Sell / Company */
export const footerNavColumns = {
  shop: [
    ...footerLinks.shop,
    { label: 'Gold Guide', href: links.insights },
    { label: 'Silver Guide', href: links.collections.silver },
    { label: 'Blog', href: links.insights },
  ],
  sell: [...footerLinks.sell],
  company: [
    ...footerLinks.company,
    { label: 'Investment Calculator', href: links.calculator },
    { label: 'FAQ', href: links.faq },
  ],
} as const

export const navLinks = [
  { label: 'Buy Gold', href: links.collections.goldBars },
  { label: 'Sell Gold', href: links.sell },
  { label: 'Sell Jewelry', href: links.sell },
  { label: 'Silver', href: links.collections.silver },
  { label: 'Coins', href: links.collections.goldCoins },
  { label: 'Investments', href: links.calculator },
  { label: 'Resources', href: links.insights },
  { label: 'Locations', href: links.locations },
  { label: 'About Us', href: links.about },
  { label: 'Contact Us', href: links.contact },
]
