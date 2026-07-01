import { createFileRoute } from '@tanstack/react-router'
import { SellPageContent } from '@/components/pages/SellPageContent'

export const Route = createFileRoute('/sell')({
  component: SellPageContent,
})
