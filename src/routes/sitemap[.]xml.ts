import { createFileRoute } from '@tanstack/react-router'
import { catalogProducts } from '@/lib/db/catalog'
import { insightArticles } from '@/data/copy'
import { seedCollections } from '@/data/seed/catalog'

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async () => {
        const baseUrl = process.env.VITE_APP_URL ?? 'https://primegoldtrading.com'
        const staticRoutes = [
          '',
          '/shop',
          '/sell',
          '/estimate',
          '/calculator',
          '/faq',
          '/press',
          '/locations',
          '/insights',
          '/about',
          '/contact',
          '/cart',
          '/checkout',
          '/account',
          '/order-lookup',
          '/privacy',
          '/terms',
          '/shipping-returns',
        ]
        const productRoutes = catalogProducts.map((p) => `/products/${p.slug}`)
        const collectionRoutes = seedCollections.map((c) => `/collections/${c.slug}`)
        const insightRoutes = insightArticles.map((a) => `/insights/${a.slug}`)
        const all = [...staticRoutes, ...collectionRoutes, ...productRoutes, ...insightRoutes]

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all
  .map(
    (path) => `  <url>
    <loc>${baseUrl}${path}</loc>
    <changefreq>weekly</changefreq>
  </url>`,
  )
  .join('\n')}
</urlset>`

        return new Response(xml, {
          headers: { 'Content-Type': 'application/xml' },
        })
      },
    },
  },
})
