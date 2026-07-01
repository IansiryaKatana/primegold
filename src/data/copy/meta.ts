export const metaCopy = {
  home: {
    title: 'Prime Gold Trading | Buy & Sell Gold, Silver & Jewelry',
    description:
      'Prime Gold Trading — your trusted partner for buying and selling gold, silver, jewelry, and coins. 100+ branches nationwide. Book an appointment today.',
  },
  shop: {
    title: 'Shop Gold & Silver | Prime Gold Trading',
    description: 'Browse investment-grade gold bars, silver products, and bullion coins with insured delivery.',
  },
  sell: {
    title: 'Sell Your Gold & Jewelry | Prime Gold Trading',
    description: 'Get a fair, transparent offer for your gold, silver, and jewelry. Free appraisals at 100+ locations.',
  },
  estimate: {
    title: 'Gold Buyback Estimate | Prime Gold Trading',
    description: 'Calculate a preliminary estimate for your gold and silver items based on live spot prices.',
  },
  locations: {
    title: 'Branch Locations | Prime Gold Trading',
    description: 'Find a Prime Gold branch near you for appraisals, buyback, and bullion purchases.',
  },
  insights: {
    title: 'Gold & Silver Insights | Prime Gold Trading',
    description: 'Expert guides on investing in gold and silver, market trends, and storage best practices.',
  },
  cart: {
    title: 'Your Cart | Prime Gold Trading',
    description: 'Review your precious metals order before secure checkout.',
  },
  checkout: {
    title: 'Checkout | Prime Gold Trading',
    description: 'Complete your precious metals purchase securely.',
  },
  account: {
    title: 'My Account | Prime Gold Trading',
    description: 'Manage your orders, profile, and identity verification.',
  },
  orderLookup: {
    title: 'Order Lookup | Prime Gold Trading',
    description: 'Track your order status with your order number and email.',
  },
  privacy: {
    title: 'Privacy Policy | Prime Gold Trading',
    description: 'How Prime Gold Trading collects, uses, and protects your personal information.',
  },
  terms: {
    title: 'Terms of Service | Prime Gold Trading',
    description: 'Terms governing use of Prime Gold Trading website and services.',
  },
  shipping: {
    title: 'Shipping & Returns | Prime Gold Trading',
    description: 'Shipping rates, delivery times, and return policy for precious metals orders.',
  },
  faq: {
    title: 'FAQ | Prime Gold Trading',
    description:
      'Frequently asked questions about buying, selling, shipping, and identity verification at Prime Gold Trading.',
  },
  calculator: {
    title: 'Investment Calculator | Prime Gold Trading',
    description:
      'Estimate potential returns on gold, silver, and platinum investments with our free calculator.',
  },
  about: {
    title: 'About Us | Prime Gold Trading',
    description:
      'Learn about Prime Gold Trading — licensed dealer, 100+ branches, and 15+ years of trusted precious metals service.',
  },
  contact: {
    title: 'Contact Us | Prime Gold Trading',
    description: 'Contact Prime Gold Trading by phone, email, or visit a branch near you.',
  },
  press: {
    title: 'Press & Media | Prime Gold Trading',
    description: 'Prime Gold Trading in the news — featured coverage from leading financial publications.',
  },
} as const

export const emailCopy = {
  appointmentConfirmation: (name: string, date: string, time: string) => ({
    subject: 'Appointment Confirmed — Prime Gold Trading',
    body: `Hi ${name},\n\nYour appointment is confirmed for ${date} at ${time}. Please bring a valid photo ID.\n\nSee you soon,\nPrime Gold Trading`,
  }),
  orderConfirmation: (orderNumber: string) => ({
    subject: `Order ${orderNumber} Confirmed — Prime Gold Trading`,
    body: `Thank you for your order. Your order number is ${orderNumber}. Identity verification is required before shipment.`,
  }),
  newsletterWelcome: {
    subject: 'Welcome to Prime Gold Insights',
    body: 'Thank you for subscribing. You will receive market updates and investment insights from Prime Gold Trading.',
  },
} as const
