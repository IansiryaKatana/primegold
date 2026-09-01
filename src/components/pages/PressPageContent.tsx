'use client'

import { useQuery } from '@tanstack/react-query'
import { getHomepageContent } from '@/server/functions'
import { homeCopy } from '@/data/copy'
import { links } from '@/lib/links'
import { MotionSection, RevealBlock } from '@/components/motion'
import { Container } from '@/components/shared/primitives'
import { PageHero } from '@/components/pages/PageHero'
import { PressLogoCloud } from '@/components/home/PressLogoCloud'
import { metaCopy } from '@/data/copy/meta'

export function PressPageContent() {
  const { data } = useQuery({
    queryKey: ['homepage-content'],
    queryFn: () => getHomepageContent(),
  })

  return (
    <>
      <title>{metaCopy.press.title}</title>
      <meta name="description" content={metaCopy.press.description} />
      <PageHero
        title="Press & Media"
        subtitle="Prime Gold Trading has been featured in leading financial and business publications for our transparent approach to precious metals."
        crumbs={[
          { label: 'Home', href: links.home },
          { label: 'Press' },
        ]}
      />
      <MotionSection tier="b" className="bg-white py-16 md:py-20">
        <Container className="max-w-3xl text-center">
          <RevealBlock>
            <p className="text-desc">
              {homeCopy.press.title} — trusted by customers and recognized by industry media
              for excellence in buyback service and bullion retail.
            </p>
          </RevealBlock>
        </Container>
      </MotionSection>
      <MotionSection tier="b" className="bg-cream py-10">
        <PressLogoCloud logos={data?.pressLogos ?? []} />
      </MotionSection>
    </>
  )
}
