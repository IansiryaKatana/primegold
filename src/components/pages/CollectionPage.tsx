import { useQuery } from '@tanstack/react-query'
import { getCollection } from '@/server/functions'
import { Container, SectionHeading } from '@/components/shared/primitives'
import { ProductCard } from '@/components/home/ProductCard'
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
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'

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
    <section className="bg-white py-12 md:py-16">
      <Container>
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href={links.home}>Home</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink href={links.shop}>Shop</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>{collection.title}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <SectionHeading
          title={meta?.title ?? collection.title}
          subtitle={meta?.description ?? collection.description}
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {collection.products.map((product) => (
            <motion.div key={product.id} variants={fadeUp}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
        {collection.products.length === 0 && (
          <p className="text-muted-text">{shopCopy.empty}</p>
        )}
      </Container>
    </section>
  )
}
