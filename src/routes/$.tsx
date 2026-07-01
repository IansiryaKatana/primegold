import { createFileRoute } from '@tanstack/react-router'
import { Container } from '@/components/shared/primitives'
import { Button } from '@/components/ui/button'
import { links } from '@/lib/links'

export const Route = createFileRoute('/$')({
  component: NotFoundPage,
})

function NotFoundPage() {
  return (
    <section className="flex min-h-[50vh] items-center bg-cream py-16">
      <Container className="text-center">
        <h1 className="text-6xl text-gold">404</h1>
        <p className="mt-4 text-desc">Page not found.</p>
        <Button variant="emerald" className="mt-8" asChild>
          <a href={links.home}>Return Home</a>
        </Button>
      </Container>
    </section>
  )
}
