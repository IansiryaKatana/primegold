export const legalCopy = {
  shipping: {
    title: 'Shipping & Returns Policy',
    sections: [
      {
        heading: 'Shipping',
        body: 'Standard insured shipping is $25 per order. Premium insured shipping with signature confirmation is $35. All bullion shipments are fully insured for the declared value. Orders ship within 1–2 business days after payment clearance and identity verification.',
      },
      {
        heading: 'Delivery Times',
        body: 'Domestic delivery typically takes 3–7 business days depending on your location and shipping method selected at checkout.',
      },
      {
        heading: 'Returns',
        body: 'Due to the nature of precious metals and market price volatility, all sales are final once payment is confirmed and the order is fulfilled. Defective or misrepresented products may be returned within 7 days — contact support for assistance.',
      },
      {
        heading: 'Identity Verification',
        body: 'Purchases of precious metals require valid government-issued photo identification. Documentation is retained securely for five years in compliance with federal regulations.',
      },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    lastUpdated: 'June 2026',
    intro:
      'Prime Gold Trading ("we," "us," or "our") respects your privacy. This policy describes how we collect, use, and protect personal information when you use our website, visit our branches, or complete a transaction.',
    sections: [
      { heading: 'Information We Collect', body: 'We collect information you provide directly — name, email, phone, address, payment details, and identification documents for KYC compliance. We also collect usage data through cookies and analytics.' },
      { heading: 'How We Use Your Information', body: 'We use your information to process orders, schedule appointments, comply with legal obligations, send transactional communications, and improve our services.' },
      { heading: 'Your California Privacy Rights', body: 'California residents may request access to, deletion of, or correction of personal information we hold. Contact privacy@primegoldtrading.com to submit a request.' },
      { heading: 'Data Retention', body: 'Transaction and KYC records are retained for five years as required by federal law. Marketing preferences can be updated or withdrawn at any time.' },
      { heading: 'Contact', body: 'For privacy inquiries: privacy@primegoldtrading.com or 1-800-555-0142.' },
    ],
  },
  terms: {
    title: 'Terms of Service',
    lastUpdated: 'June 2026',
    intro:
      'These Terms of Service govern your use of the Prime Gold Trading website and services. By accessing our site or completing a transaction, you agree to these terms.',
    sections: [
      { heading: 'Services', body: 'Prime Gold Trading provides precious metals sales, buyback services, appraisals, and appointment scheduling through licensed branch locations in the United States.' },
      { heading: 'Pricing', body: 'Product prices are based on live spot market rates plus applicable premiums. Prices are locked at checkout and may change until an order is confirmed.' },
      { heading: 'Payment Methods', body: 'We accept major credit cards, bank transfer, check, and cash for in-branch transactions. Cash transactions over $10,000 are subject to federal reporting requirements.' },
      { heading: 'Compliance', body: 'All purchases require valid government-issued photo ID. We comply with the Bank Secrecy Act, USA PATRIOT Act, and applicable state precious metals dealer regulations.' },
      { heading: 'Limitation of Liability', body: 'Investment in precious metals carries market risk. Prime Gold Trading does not provide financial advice. Projections and estimates are not guarantees of future value.' },
    ],
  },
  kyc: {
    title: 'Identity Verification Required',
    body: 'Federal regulations require valid identification for precious metals purchases. Please upload a clear photo of your government-issued ID. Documents are encrypted and retained for five years.',
    uploadLabel: 'Upload ID Document',
    submit: 'Submit for Review',
    statusPending: 'Your documents are under review. We will notify you by email within 1–2 business days.',
    statusApproved: 'Identity verified. Your order will ship shortly.',
    retentionNote: 'Documents are stored securely and retained for five years per federal compliance requirements.',
  },
} as const
