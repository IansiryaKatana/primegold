export const contactCopy = {
  title: 'Contact Us',
  subtitle:
    'Reach our team by phone, email, or visit any branch. Book an appointment for a dedicated appraisal session.',
  channels: [
    {
      title: 'Phone',
      description: 'Speak with a specialist during market hours.',
      action: 'Call us',
    },
    {
      title: 'Email',
      description: 'We respond within one business day.',
      action: 'Send email',
    },
    {
      title: 'Visit a Branch',
      description: 'Walk-ins welcome. Appointments recommended.',
      action: 'View locations',
    },
  ],
  form: {
    title: 'Send a Message',
    subtitle: 'Questions about buying, selling, or your order? We are here to help.',
    nameLabel: 'Full Name',
    emailLabel: 'Email Address',
    subjectLabel: 'Subject',
    messageLabel: 'Message',
    submit: 'Send Message',
    success: 'Thank you — we will respond shortly.',
    error: 'Unable to send your message. Please try again or call us directly.',
    subjects: [
      'Buying gold or silver',
      'Selling jewelry or bullion',
      'Order status',
      'Branch & appointments',
      'Other',
    ],
  },
} as const
