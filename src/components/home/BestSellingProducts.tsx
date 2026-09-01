'use client'

import { useQuery } from '@tanstack/react-query'
import { homeCopy } from '@/data/copy'
import { links } from '@/lib/links'
import { getFeaturedProducts } from '@/server/functions'
import { MotionSection, RevealBlock, StaggerGrid } from '@/components/motion'
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

        <StaggerGrid className="grid min-w-0 gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {products.map((product) => (
            <div key={product.id} className="min-w-0">
              <ProductCard product={product} />
            </div>
          ))}
        </StaggerGrid>

        <RevealBlock className="mt-10 flex justify-center">
          <Button variant="outlineGold" size="lg" asChild>
            <a href={links.shop}>{homeCopy.products.viewAll}</a>
          </Button>
        </RevealBlock>
      </Container>
    </MotionSection>
  )
}
