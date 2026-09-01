'use client'

import { useState } from 'react'
import { estimateCopy } from '@/data/copy'
import { links } from '@/lib/links'
import { MotionSection, RevealBlock, RevealText, StaggerGrid } from '@/components/motion'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Container } from '@/components/shared/primitives'
import { PageHero } from '@/components/pages/PageHero'
import { calculateBuybackEstimate } from '@/server/functions'
import { formatCurrency } from '@/lib/utils'
import { metaCopy } from '@/data/copy/meta'
import { Check } from 'lucide-react'

const rateRows = [
  { label: '24K Gold', pct: '95–98%' },
  { label: '22K Gold', pct: '90–94%' },
  { label: '18K Gold', pct: '72–76%' },
  { label: '14K Gold', pct: '55–60%' },
  { label: '10K Gold', pct: '40–44%' },
  { label: 'Sterling Silver (.925)', pct: '85–90%' },
]

export function EstimatePageContent() {
  const [materialType, setMaterialType] = useState('gold')
  const [karat, setKarat] = useState('14k')
  const [weightG, setWeightG] = useState('10')
  const [result, setResult] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleCalculate(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const data = await calculateBuybackEstimate({
        data: { materialType, karat, weightG: parseFloat(weightG) },
      })
      setResult(data.estimatedTotal as number)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <title>{metaCopy.estimate.title}</title>
      <meta name="description" content={metaCopy.estimate.description} />
      <PageHero
        title={estimateCopy.title}
        subtitle={estimateCopy.subtitle}
        crumbs={[
          { label: 'Home', href: links.home },
          { label: 'Sell', href: links.sell },
          { label: 'Estimate' },
        ]}
      />

      <MotionSection tier="d" className="bg-cream py-16 md:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <form
              onSubmit={handleCalculate}
              className="flex flex-col gap-4 rounded-sm border border-warm-border bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col gap-2">
                <Label>{estimateCopy.materialLabel}</Label>
                <Select
                  value={materialType}
                  onValueChange={(v) => {
                    setMaterialType(v)
                    if (v === 'silver') setKarat('silver')
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gold">Gold</SelectItem>
                    <SelectItem value="silver">Silver</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label>{estimateCopy.karatLabel}</Label>
                <Select value={karat} onValueChange={setKarat}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {materialType === 'gold' ? (
                      <>
                        <SelectItem value="24k">24K</SelectItem>
                        <SelectItem value="22k">22K</SelectItem>
                        <SelectItem value="18k">18K</SelectItem>
                        <SelectItem value="14k">14K</SelectItem>
                        <SelectItem value="10k">10K</SelectItem>
                      </>
                    ) : (
                      <SelectItem value="silver">Sterling (.925)</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="weight">{estimateCopy.weightLabel}</Label>
                <Input
                  id="weight"
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={weightG}
                  onChange={(e) => setWeightG(e.target.value)}
                />
              </div>
              <Button type="submit" variant="emerald" disabled={loading}>
                {estimateCopy.calculate}
              </Button>
              {result !== null && (
                <div className="rounded-sm bg-cream p-4 text-center">
                  <p className="text-sm text-muted-text">{estimateCopy.resultLabel}</p>
                  <p className="mt-2 text-4xl text-gold">{formatCurrency(result)}</p>
                  <p className="mt-2 text-sm text-muted-text">{estimateCopy.disclaimer}</p>
                </div>
              )}
            </form>

            <RevealBlock>
              <h2 className="text-xl text-primary-text md:text-2xl">
                {estimateCopy.rateTableTitle}
              </h2>
              <p className="mt-2 text-sm text-muted-text">{estimateCopy.rateTableNote}</p>
              <div className="mt-6 overflow-hidden rounded-sm border border-warm-border">
                <table className="w-full text-sm md:text-base">
                  <thead className="bg-emerald-deep text-left text-white">
                    <tr>
                      <th className="px-4 py-3 font-normal">Material</th>
                      <th className="px-4 py-3 font-normal">% of Spot</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rateRows.map((row) => (
                      <tr key={row.label} className="border-t border-warm-border">
                        <td className="px-4 py-3 text-primary-text">{row.label}</td>
                        <td className="px-4 py-3 text-gold">{row.pct}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </RevealBlock>
          </div>
        </Container>
      </MotionSection>

      <MotionSection tier="b" className="bg-white py-16 md:py-20">
        <Container className="max-w-3xl">
          <RevealText as="h2" className="text-2xl text-primary-text md:text-3xl">
            {estimateCopy.education.title}
          </RevealText>
          <StaggerGrid className="mt-6 flex flex-col gap-3" stagger={0.08}>
            {estimateCopy.education.points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-desc">
                <Check className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden />
                {point}
              </li>
            ))}
          </StaggerGrid>
          <RevealBlock className="mt-8">
            <Button variant="gold" asChild>
              <a href={links.locations}>Book an In-Branch Appraisal</a>
            </Button>
          </RevealBlock>
        </Container>
      </MotionSection>
    </>
  )
}
