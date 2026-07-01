export const sellCopy = {
  title: 'Sell Your Gold & Precious Metals',
  subtitle:
    'Get a fair, transparent offer for your gold, silver, jewelry, and coins. Free appraisals at every branch — no obligation.',
  estimateCta: 'Get an Instant Estimate',
  appointmentCta: 'Book an Appointment',
  acceptedTitle: 'What We Buy',
  rejectedTitle: 'What We Do Not Buy',
  accepted: [
    'Gold jewelry (10K–24K)',
    'Silver jewelry and flatware',
    'Gold and silver coins',
    'Gold and silver bars',
    'Dental gold',
    'Broken or damaged jewelry',
    'Estate and antique pieces',
    'Pocket watches with gold cases',
  ],
  rejected: [
    'Gold-plated or gold-filled items',
    'Costume jewelry',
    'Non-precious metal items',
    'Stolen or suspected stolen goods',
    'Items without proof of ownership when required',
  ],
  disclaimer:
    'All estimates are preliminary. Final offers are determined after in-person evaluation of weight, purity, and condition at a Prime Gold branch.',
  process: {
    title: 'How Selling Works',
    steps: [
      {
        title: 'Bring or book',
        description: 'Walk into any branch or schedule an at-home or in-branch appointment online.',
      },
      {
        title: 'Free appraisal',
        description: 'We test purity and weight using professional equipment and live spot prices.',
      },
      {
        title: 'Get your offer',
        description: 'Receive a transparent, no-obligation quote — accept or decline with no pressure.',
      },
      {
        title: 'Same-day payment',
        description: 'Accept your offer and choose cash, check, or bank transfer the same day.',
      },
    ],
  },
} as const

export const estimateCopy = {
  title: 'Estimate Your Gold',
  subtitle: 'Use our calculator for a preliminary buyback estimate based on current spot prices.',
  materialLabel: 'Material Type',
  karatLabel: 'Karat / Purity',
  weightLabel: 'Weight (grams)',
  calculate: 'Calculate Estimate',
  resultLabel: 'Estimated Value',
  disclaimer:
    'This is an estimate only. Final offers are determined in branch after professional testing. Spot prices update throughout the trading day.',
  karatRates: {
    '24k': 0.999,
    '22k': 0.916,
    '18k': 0.75,
    '14k': 0.585,
    '10k': 0.417,
    silver: 0.925,
  },
  rateTableTitle: 'Reference Buyback Rates',
  rateTableNote:
    'Rates below are illustrative percentages of spot price by purity. Your final offer may vary based on weight, condition, and market movement.',
  education: {
    title: 'Before You Visit',
    points: [
      'Gather items you wish to sell — broken jewelry and mismatched pieces are welcome.',
      'Bring a valid government-issued photo ID.',
      'Remove stones only if you wish; we can appraise jewelry with gemstones separately.',
      'Use this calculator for a preliminary estimate — final offers are confirmed in branch.',
    ],
  },
} as const
