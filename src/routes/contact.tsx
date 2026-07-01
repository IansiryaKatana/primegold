import { createFileRoute } from '@tanstack/react-router'
import { ContactPageContent } from '@/components/pages/ContactPageContent'

export const Route = createFileRoute('/contact')({
  component: ContactPageContent,
})
