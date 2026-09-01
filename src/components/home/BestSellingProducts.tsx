'use client'

import { useQuery } from '@tanstack/react-query'
import { homeCopy } from '@/data/copy'
import { AppLink } from '@/components/shared/AppLink'
import { SnapCarousel } from '@/components/shared/SnapCarousel'
import { links } from '@/lib/links'
import { getFeaturedProducts } from '@/server/functions'
import { MotionSection, RevealBlock } from '@/components/motion'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/home/ProductCard'
import { Container, SectionHeading } from '@/components/shared/primitives'

export function BestSellingProducts() {
  const { data: products = [] } = useQuery({
    queryKey: ['featured-products'],
    queryFn: () => getFeaturedProducts(),
  })

  return (
    <MotionSection id="products" tier="b" className="bg-white py-16 md:py-20">
      <Container>
        <SectionHeading
          title={homeCopy.products.title}
          subtitle={homeCopy.products.subtitle}
        />

        <SnapCarousel gridClassName="min-w-0 gap-5 lg:grid-cols-4">
          {products.map((product) => (
            <div key={product.id} className="min-w-0">
              <ProductCard product={product} />
            </div>
          ))}
        </SnapCarousel>

        <RevealBlock className="mt-10 flex justify-center">
          <Button variant="outlineGold" size="lg" asChild>
            <AppLink href={links.shop}>{homeCopy.products.viewAll}</AppLink>
          </Button>
        </RevealBlock>
      </Container>
    </MotionSection>
  )
}
