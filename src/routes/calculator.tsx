import { createFileRoute } from '@tanstack/react-router'
import { CalculatorPage } from '@/components/pages/CalculatorPage'

export const Route = createFileRoute('/calculator')({
  component: CalculatorPage,
})
