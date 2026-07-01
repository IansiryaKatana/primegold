import { createFileRoute } from '@tanstack/react-router'
import { CollectionPage } from '@/components/pages/CollectionPage'

export const Route = createFileRoute('/collections/$slug')({
  component: CollectionRoute,
})

function CollectionRoute() {
  const { slug } = Route.useParams()
  return <CollectionPage slug={slug} />
}
