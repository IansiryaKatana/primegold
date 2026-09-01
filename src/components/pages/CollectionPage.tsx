'use client'

import { useQuery } from '@tanstack/react-query'
import { getCollection } from '@/server/functions'
import { Container, SectionHeading } from '@/components/shared/primitives'
import { ProductCard } from '@/components/home/ProductCard'
import { MotionSection, RevealBlock, StaggerGrid } from '@/components/motion'
import { collectionCopy, shopCopy } from '@/data/copy'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { links } from '@/lib/links'

type CollectionPageProps = { slug: string }

export function CollectionPage({ slug }: CollectionPageProps) {
  const { data: collection, isLoading } = useQuery({
    queryKey: ['collection', slug],
    queryFn: () => getCollection({ data: slug }),
  })

  const meta = collectionCopy[slug]

  if (isLoading) return <Container className="py-16"><p>Loading…</p></Container>
  if (!collection) return <Container className="py-16"><p>Collection not found.</p></Container>

  return (
    <MotionSection tier="c" className="bg-white py-12 md:py-16">
      <Container>
        <RevealBlock scroll={false} className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href={links.home}>Home</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbLink href={links.shop}>Shop</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>{collection.title}</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </RevealBlock>
        <SectionHeading
          title={meta?.title ?? collection.title}
          subtitle={meta?.description ?? collection.description}
        />
        <StaggerGrid className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {collection.products.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </StaggerGrid>
        {collection.products.length === 0 && (
          <p className="text-muted-text">{shopCopy.empty}</p>
        )}
      </Container>
    </MotionSection>
  )
}
