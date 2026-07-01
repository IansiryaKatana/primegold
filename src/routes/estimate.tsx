import { createFileRoute } from '@tanstack/react-router'
import { EstimatePageContent } from '@/components/pages/EstimatePageContent'

export const Route = createFileRoute('/estimate')({
  component: EstimatePageContent,
})
