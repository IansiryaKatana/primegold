'use client'

import { useQuery } from '@tanstack/react-query'
import { useState, useMemo } from 'react'
import { ShieldCheck, Truck, Lock } from 'lucide-react'
import { getProduct } from '@/server/functions'
import { AppLink } from '@/components/shared/AppLink'
import { formatCurrency, cn } from '@/lib/utils'
import { links } from '@/lib/links'
import { shopCopy, productsCopy } from '@/data/copy'
import { metaCopy } from '@/data/copy/meta'
import { JsonLd, productJsonLd } from '@/lib/seo'
import { MotionSection, RevealBlock, StaggerGrid } from '@/components/motion'
import { resolveUnitPrice } from '@/lib/cart'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { ProductCard } from '@/components/home/ProductCard'
import { AddToCartButton } from '@/components/cart/AddToCartButton'
import { QuantityStepper } from '@/components/cart/QuantityStepper'
import { Container } from '@/components/shared/primitives'
import { useCartStore } from '@/store/cart'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type ProductPageProps = { slug: string }

const trustIcons = [Truck, ShieldCheck, Lock]

export function ProductPage({ slug }: ProductPageProps) {
  const addItem = useCartStore((s) => s.addItem)
  const [qty, setQty] = useState(1)

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => getProduct({ data: slug }),
  })

  const unitPrice = useMemo(() => {
    if (!product) return 0
    return resolveUnitPrice(product.price, qty, product.bulkTiers)
  }, [product, qty])

  const lineTotal = unitPrice * qty

  if (isLoading) {
    return (
      <Container className="py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <Skeleton className="aspect-[3/4] w-full rounded-sm" />
          <div className="flex flex-col gap-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-12 w-1/3" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </Container>
    )
  }

  if (!product) {
    return (
      <Container className="py-20 text-center">
        <h1 className="text-heading text-primary-text">Product Not Found</h1>
        <Button variant="emerald" className="mt-6" asChild>
          <AppLink href={links.shop}>View All Products</AppLink>
        </Button>
      </Container>
    )
  }

  function handleBuyNow() {
    if (!product) return
    addItem(product, { qty, bulkTiers: product.bulkTiers, openDrawer: false })
    window.location.href = links.checkout
  }

  return (
    <>
      <title>{product.name} | Prime Gold Trading</title>
      <meta name="description" content={product.description ?? metaCopy.shop.description} />
      <JsonLd data={productJsonLd({ ...product, description: product.description })} />
      <MotionSection tier="c" className="py-10 md:py-16">
      <Container>
        <RevealBlock scroll={false} className="mb-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={links.home}>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={links.shop}>Shop</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        </RevealBlock>

        <StaggerGrid className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16" stagger={0.12}>
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-image-surface ring-1 ring-primary-text/5">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="absolute inset-0 size-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="gold" className="capitalize">
                {product.metalType}
              </Badge>
              <Badge variant="outline">{product.purity}</Badge>
              <Badge variant="outline">{product.weight}</Badge>
              {product.inStock ? (
                <Badge variant="default">{shopCopy.inStock}</Badge>
              ) : (
                <Badge variant="secondary">{shopCopy.outOfStock}</Badge>
              )}
            </div>

            <div>
              <h1 className="text-heading text-primary-text">{product.name}</h1>
              <p className="mt-3 text-3xl text-gold tabular-nums md:text-4xl">{formatCurrency(unitPrice)}</p>
              {unitPrice < product.price && (
                <p className="mt-1 text-sm text-emerald-deep">
                  Bulk pricing applied — was {formatCurrency(product.price)}
                </p>
              )}
            </div>

            <Separator />

            <p className="text-desc leading-relaxed">{product.description}</p>

            <Card>
              <CardContent className="flex flex-col gap-5 p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-text">Quantity</p>
                    <QuantityStepper value={qty} onChange={setQty} className="mt-2" />
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-text">Line total</p>
                    <p className="text-2xl text-gold tabular-nums">{formatCurrency(lineTotal)}</p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 sm:items-stretch">
                  <AddToCartButton
                    product={product}
                    qty={qty}
                    bulkTiers={product.bulkTiers}
                    size="default"
                    className="w-full"
                  />
                  <Button
                    type="button"
                    variant="outlineGold"
                    size="default"
                    className="h-10 w-full"
                    disabled={!product.inStock}
                    onClick={handleBuyNow}
                  >
                    Buy Now
                  </Button>
                </div>
              </CardContent>
            </Card>

            {product.bulkTiers && product.bulkTiers.length > 1 && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{shopCopy.bulkPricing}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 pb-4">
                  <div className="surface-inset mx-6 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Quantity</TableHead>
                        <TableHead className="text-right">Unit Price</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {product.bulkTiers.map((tier) => (
                        <TableRow
                          key={tier.minQty}
                          className={cn(qty >= tier.minQty && 'bg-cream/60')}
                        >
                          <TableCell>{tier.minQty}+</TableCell>
                          <TableCell className="text-right text-gold">
                            {formatCurrency(tier.price)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid gap-3 sm:grid-cols-2">
              {productsCopy.trustStrip.map((label, i) => {
                const Icon = trustIcons[i] ?? ShieldCheck
                return (
                  <div key={label} className="surface-feature flex items-center gap-2.5 px-4 py-3 text-sm text-primary-text">
                    <Icon className="size-4 shrink-0 text-gold" />
                    {label}
                  </div>
                )
              })}
            </div>
          </div>
        </StaggerGrid>

        {product.related && product.related.length > 0 && (
          <div className="mt-16 border-t border-warm-border pt-16">
            <RevealBlock>
              <h2 className="text-subheading text-primary-text">{shopCopy.related}</h2>
            </RevealBlock>
            <StaggerGrid className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
              {product.related.map((related) => (
                <ProductCard key={related.id} product={related} />
              ))}
            </StaggerGrid>
          </div>
        )}
      </Container>
      </MotionSection>
    </>
  )
}
