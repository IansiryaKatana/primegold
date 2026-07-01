import { useQuery } from '@tanstack/react-query'
import { getAllProducts } from '@/server/functions'
import { Container, FormField, SectionHeading } from '@/components/shared/primitives'
import { ProductCard } from '@/components/home/ProductCard'
import { shopCopy } from '@/data/copy'
import { metaCopy } from '@/data/copy/meta'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'

export function ShopPage() {
  const [metal, setMetal] = useState('all')
  const [sort, setSort] = useState('featured')
  const [q, setQ] = useState('')

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products', metal, sort, q],
    queryFn: () => getAllProducts({ data: { metal: metal === 'all' ? undefined : metal, sort, q } }),
  })

  return (
    <>
      <title>{metaCopy.shop.title}</title>
      <meta name="description" content={metaCopy.shop.description} />
      <section className="bg-white py-12 md:py-16">
        <Container>
          <SectionHeading title={shopCopy.title} subtitle={shopCopy.subtitle} />
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end">
            <FormField label={shopCopy.searchPlaceholder} htmlFor="search" className="flex-1">
              <Input
                id="search"
                placeholder={shopCopy.searchPlaceholder}
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </FormField>
            <FormField label={shopCopy.filters.metal} className="w-full sm:w-40">
              <Select value={metal} onValueChange={setMetal}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{shopCopy.filters.all}</SelectItem>
                  <SelectItem value="gold">{shopCopy.filters.gold}</SelectItem>
                  <SelectItem value="silver">{shopCopy.filters.silver}</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
            <FormField label={shopCopy.filters.sort} className="w-full sm:w-48">
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">{shopCopy.filters.sortFeatured}</SelectItem>
                  <SelectItem value="price-asc">{shopCopy.filters.sortPriceAsc}</SelectItem>
                  <SelectItem value="price-desc">{shopCopy.filters.sortPriceDesc}</SelectItem>
                  <SelectItem value="name">{shopCopy.filters.sortName}</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>
          {isLoading ? (
            <p className="text-muted-text">Loading products…</p>
          ) : products.length === 0 ? (
            <p className="text-muted-text">{shopCopy.empty}</p>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            >
              {products.map((product) => (
                <motion.div key={product.id} variants={fadeUp}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </Container>
      </section>
    </>
  )
}
