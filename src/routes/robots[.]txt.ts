import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/robots.txt')({
  server: {
    handlers: {
      GET: async () => {
        const baseUrl = process.env.VITE_APP_URL ?? 'https://primegoldtrading.com'
        const body = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`
        return new Response(body, {
          headers: { 'Content-Type': 'text/plain' },
        })
      },
    },
  },
})
