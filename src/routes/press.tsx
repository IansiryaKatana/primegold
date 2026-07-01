'use client'

import { createFileRoute } from '@tanstack/react-router'
import { PressPageContent } from '@/components/pages/PressPageContent'

export const Route = createFileRoute('/press')({
  component: PressPageContent,
})
