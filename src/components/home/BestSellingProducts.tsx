import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { homeCopy } from '@/data/copy'
import { links } from '@/lib/links'
import { getFeaturedProducts } from '@/server/functions'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/home/ProductCard'
import { Container, SectionHeading } from '@/components/shared/primitives'

export function BestSellingProducts() {
  const { data: products = [] } = useQuery({
    queryKey: ['featured-products'],
    queryFn: () => getFeaturedProducts(),
  })

  return (
    <section id="products" className="bg-white py-16 md:py-20">
      <Container>
        <SectionHeading
          title={homeCopy.products.title}
          subtitle={homeCopy.products.subtitle}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid min-w-0 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={fadeUp} className="min-w-0">
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 flex justify-center">
          <Button variant="outlineGold" size="lg" asChild>
            <a href={links.shop}>{homeCopy.products.viewAll}</a>
          </Button>
        </div>
      </Container>
    </section>
  )
}
