'use client'

import { createFileRoute } from '@tanstack/react-router'
import { MotionSection, RevealBlock, RevealText } from '@/components/motion'
import { Container } from '@/components/shared/primitives'
import { Button } from '@/components/ui/button'
import { links } from '@/lib/links'

export const Route = createFileRoute('/$')({
  component: NotFoundPage,
})

function NotFoundPage() {
  return (
    <MotionSection tier="d" className="flex min-h-[50vh] items-center bg-cream py-16">
      <Container className="text-center">
        <RevealText as="h1" scroll={false} className="text-6xl text-gold">
          404
        </RevealText>
        <RevealBlock scroll={false} delay={0.1} className="mt-4">
          <p className="text-desc">Page not found.</p>
        </RevealBlock>
        <RevealBlock scroll={false} delay={0.2} className="mt-8">
          <Button variant="emerald" asChild>
            <a href={links.home}>Return Home</a>
          </Button>
        </RevealBlock>
      </Container>
    </MotionSection>
  )
}
