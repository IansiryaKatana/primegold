'use client'

import { useQuery } from '@tanstack/react-query'
import { MapPin } from 'lucide-react'
import { getBranches } from '@/server/functions'
import { AppLink } from '@/components/shared/AppLink'
import { SnapCarousel } from '@/components/shared/SnapCarousel'
import { locationsCopy } from '@/data/copy'
import { locationLink, links } from '@/lib/links'
import { MotionSection, RevealBlock } from '@/components/motion'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/shared/primitives'
import { PageHero } from '@/components/pages/PageHero'
import { BranchMap } from '@/components/home/BranchMap'
import { metaCopy } from '@/data/copy/meta'

export function LocationsPageContent() {
  const { data: branches = [] } = useQuery({
    queryKey: ['branches'],
    queryFn: () => getBranches(),
  })

  return (
    <>
      <title>{metaCopy.locations.title}</title>
      <meta name="description" content={metaCopy.locations.description} />
      <PageHero
        title={locationsCopy.indexTitle}
        subtitle={locationsCopy.indexSubtitle}
        crumbs={[
          { label: 'Home', href: links.home },
          { label: 'Locations' },
        ]}
      >
        <Button variant="gold" asChild>
          <AppLink href={`${links.home}#locations`}>Book Appointment</AppLink>
        </Button>
      </PageHero>

      <MotionSection tier="b" className="bg-white py-16 md:py-20">
        <Container>
          <RevealBlock className="mb-10">
            <BranchMap className="min-h-[360px]" />
          </RevealBlock>
          <SnapCarousel gridClassName="gap-4 lg:grid-cols-3">
            {branches.map((branch) => (
              <AppLink
                key={branch.id}
                href={locationLink(branch.slug!)}
                className="surface-interactive group block h-full p-5"
              >
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden />
                  <div>
                    <h3 className="text-base text-primary-text group-hover:text-emerald-deep md:text-lg">
                      {branch.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted-text">
                      {branch.address}, {branch.city}, {branch.state}
                    </p>
                    <p className="mt-1 text-sm text-gold">{branch.phone}</p>
                  </div>
                </div>
              </AppLink>
            ))}
          </SnapCarousel>
        </Container>
      </MotionSection>
    </>
  )
}
