'use client'

import { useRef } from 'react'
import { Check, X } from 'lucide-react'
import { links } from '@/lib/links'
import { homeCopy } from '@/data/copy'
import type { ComparisonRow } from '@/lib/types'
import { MotionSection, RevealBlock } from '@/components/motion'
import { useGSAP, scrollReveal } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Container, RatingStars, SectionHeading } from '@/components/shared/primitives'

type ComparisonSectionProps = {
  rows: ComparisonRow[]
}

function AnimatedTableBody({ rows }: { rows: ComparisonRow[] }) {
  const ref = useRef<HTMLTableSectionElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (!ref.current || reduced) return
      const tableRows = ref.current.querySelectorAll('tr')
      scrollReveal(tableRows, {
        stagger: 0.06,
        scrollTrigger: { trigger: ref.current, once: true },
      })
    },
    { scope: ref, dependencies: [rows, reduced] },
  )

  return (
    <TableBody ref={ref}>
      {rows.map((row) => (
        <TableRow key={row.feature}>
          <TableCell>{row.feature}</TableCell>
          <TableCell className="bg-emerald-deep/5 text-center">
            {row.primeGold ? (
              <Check className="mx-auto size-5 text-green-600" />
            ) : (
              <X className="mx-auto size-5 text-red-500" />
            )}
          </TableCell>
          <TableCell className="text-center">
            {row.otherDealers ? (
              <Check className="mx-auto size-5 text-green-600" />
            ) : (
              <X className="mx-auto size-5 text-red-500" />
            )}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}

export function ComparisonSection({ rows }: ComparisonSectionProps) {
  return (
    <MotionSection tier="b" className="bg-white py-16 md:py-20">
      <Container>
        <SectionHeading title={homeCopy.comparison.title} />

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="min-w-0 overflow-x-auto lg:col-span-2">
            <Table className="min-w-[32rem]">
              <TableHeader>
                <TableRow>
                  <TableHead>Feature</TableHead>
                  <TableHead className="bg-emerald-deep text-white">
                    Prime Gold Trading
                  </TableHead>
                  <TableHead>Other Dealers</TableHead>
                </TableRow>
              </TableHeader>
              <AnimatedTableBody rows={rows} />
            </Table>
          </div>

          <RevealBlock delay={0.2}>
            <Card className="flex flex-col items-center justify-center rounded-none border-0 bg-emerald-deep p-8 text-center shadow-none">
              <CardContent className="flex flex-col items-center gap-4 p-0">
                <h3 className="text-xl text-white md:text-2xl">
                  Trusted by Thousands
                </h3>
                <RatingStars rating={5} />
                <p className="text-5xl text-gold md:text-6xl">4.9/5</p>
                <p className="text-base font-extralight text-white/80 md:text-lg">
                  Based on 50,000+ reviews
                </p>
                <Button variant="outlineGold" asChild>
                  <a href={links.testimonials}>See Our Reviews</a>
                </Button>
              </CardContent>
            </Card>
          </RevealBlock>
        </div>
      </Container>
    </MotionSection>
  )
}
