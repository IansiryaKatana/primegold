'use client'

import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { getBranch } from '@/server/functions'
import { AppLink } from '@/components/shared/AppLink'
import { locationsCopy } from '@/data/copy'
import { links } from '@/lib/links'
import { MotionSection, StaggerGrid } from '@/components/motion'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/shared/primitives'
import { PageHero } from '@/components/pages/PageHero'
import { Phone, MapPin, Clock } from 'lucide-react'

export const Route = createFileRoute('/locations/$slug')({
  component: BranchDetailPage,
})

function BranchDetailPage() {
  const { slug } = Route.useParams()
  const { data: branch, isLoading } = useQuery({
    queryKey: ['branch', slug],
    queryFn: () => getBranch({ data: slug }),
  })

  if (isLoading) {
    return (
      <Container className="py-16">
        <p className="text-muted-text">Loading branch…</p>
      </Container>
    )
  }

  if (!branch) {
    return (
      <Container className="py-16">
        <p className="text-muted-text">Branch not found.</p>
      </Container>
    )
  }

  return (
    <>
      <PageHero
        title={locationsCopy.localHero(branch.city)}
        subtitle={locationsCopy.localBody(branch.city)}
        crumbs={[
          { label: 'Home', href: links.home },
          { label: 'Locations', href: links.locations },
          { label: branch.city },
        ]}
      >
        <Button variant="gold" asChild>
          <AppLink href={`${links.home}#locations`}>{locationsCopy.bookHere}</AppLink>
        </Button>
        <Button variant="outlineGold" asChild>
          <a href={`tel:${branch.phone.replace(/\D/g, '')}`}>{locationsCopy.callBranch}</a>
        </Button>
      </PageHero>
      <MotionSection tier="b" className="bg-white py-16 md:py-20">
        <Container>
          <StaggerGrid className="grid gap-8 md:grid-cols-2" stagger={0.12}>
            <div className="surface-panel flex flex-col gap-4 p-6">
              <h2 className="text-xl text-primary-text">Branch Details</h2>
              <p className="flex items-start gap-3 text-desc">
                <MapPin className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden />
                <span>
                  {branch.address}
                  <br />
                  {branch.city}, {branch.state}
                </span>
              </p>
              <p className="flex items-center gap-3 text-desc">
                <Phone className="size-5 shrink-0 text-gold" aria-hidden />
                <a href={`tel:${branch.phone.replace(/\D/g, '')}`} className="text-gold hover:underline">
                  {branch.phone}
                </a>
              </p>
              <p className="flex items-start gap-3 text-desc">
                <Clock className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden />
                <span>
                  {locationsCopy.hours}: {branch.openingHours}
                </span>
              </p>
            </div>
            <div className="surface-panel-muted p-6">
              <h2 className="text-xl text-primary-text">{locationsCopy.services}</h2>
              <ul className="mt-4 flex flex-col gap-2 text-desc">
                <li>Free gold & jewelry appraisals</li>
                <li>Same-day buyback payment</li>
                <li>Investment-grade bullion sales</li>
                <li>Private consultation rooms</li>
              </ul>
              <Button variant="emerald" className="mt-6 w-full" asChild>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${branch.address}, ${branch.city}, ${branch.state}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {locationsCopy.directions}
                </a>
              </Button>
            </div>
          </StaggerGrid>
        </Container>
      </MotionSection>
    </>
  )
}
