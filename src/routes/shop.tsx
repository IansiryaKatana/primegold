import { createFileRoute } from '@tanstack/react-router'
import { ShopPage } from '@/components/pages/ShopPage'

export const Route = createFileRoute('/shop')({
  component: ShopPage,
})
