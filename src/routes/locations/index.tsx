import { createFileRoute } from '@tanstack/react-router'
import { LocationsPageContent } from '@/components/pages/LocationsPageContent'

export const Route = createFileRoute('/locations/')({
  component: LocationsPageContent,
})
