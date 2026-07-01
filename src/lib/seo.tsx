type JsonLdProps = {
  data: Record<string, unknown>
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function productJsonLd(product: {
  name: string
  description?: string
  imageUrl: string
  price: number
  slug: string
}) {
  const baseUrl = import.meta.env.VITE_APP_URL ?? 'https://primegoldtrading.com'
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.imageUrl,
    sku: product.slug,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: product.price,
      availability: 'https://schema.org/InStock',
      url: `${baseUrl}/products/${product.slug}`,
    },
  }
}
