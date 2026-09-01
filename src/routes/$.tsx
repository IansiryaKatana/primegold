'use client'

import { createFileRoute } from '@tanstack/react-router'
import { MotionSection, RevealBlock } from '@/components/motion'
import { AppLink } from '@/components/shared/AppLink'
import { Container } from '@/components/shared/primitives'
import { Button } from '@/components/ui/button'
import { links } from '@/lib/links'

export const Route = createFileRoute('/$')({
  component: NotFoundPage,
})

function NotFoundPage() {
  return (
    <MotionSection tier="d" className="flex min-h-[50svh] items-center bg-cream py-16">
      <Container className="text-center">
        <RevealBlock scroll={false}>
          <h1 className="text-5xl text-gold sm:text-6xl md:text-7xl">404</h1>
        </RevealBlock>
        <RevealBlock scroll={false} delay={0.1} className="mt-4">
          <p className="text-desc">Page not found.</p>
        </RevealBlock>
        <RevealBlock scroll={false} delay={0.2} className="mt-8">
          <Button variant="emerald" asChild>
            <AppLink href={links.home}>Return Home</AppLink>
          </Button>
        </RevealBlock>
      </Container>
    </MotionSection>
  )
}
