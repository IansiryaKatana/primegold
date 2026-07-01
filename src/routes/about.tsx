import { createFileRoute } from '@tanstack/react-router'
import { AboutPageContent } from '@/components/pages/AboutPageContent'

export const Route = createFileRoute('/about')({
  component: AboutPageContent,
})
