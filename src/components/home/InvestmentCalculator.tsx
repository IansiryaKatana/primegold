'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/motion'
import { homeCopy } from '@/data/copy'
import { formatCurrency } from '@/lib/utils'
import { calculateInvestmentReturn } from '@/server/functions'
import type { InvestmentReturnResult } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Container, FormField, SectionHeading } from '@/components/shared/primitives'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function InvestmentCalculator({ page = false }: { page?: boolean }) {
  const copy = homeCopy.calculator
  const [metalType, setMetalType] = useState('gold')
  const [duration, setDuration] = useState('12')
  const [amount, setAmount] = useState('10000')
  const [currency, setCurrency] = useState('USD')
  const [result, setResult] = useState<InvestmentReturnResult | null>(null)
  const [displayValue, setDisplayValue] = useState(0)
  const [loading, setLoading] = useState(false)
  const resultRef = useRef<HTMLParagraphElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!result || reduced) {
      setDisplayValue(result?.projectedValue ?? 0)
      return
    }
    const obj = { val: 0 }
    gsap.to(obj, {
      val: result.projectedValue,
      duration: 1.2,
      ease: 'power2.out',
      onUpdate: () => setDisplayValue(Math.round(obj.val * 100) / 100),
    })
  }, [result, reduced])

  async function handleCalculate(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const data = await calculateInvestmentReturn({
        data: {
          metalType,
          amount: parseFloat(amount),
          durationMonths: parseInt(duration),
          currency,
        },
      })
      setResult(data)
    } finally {
      setLoading(false)
    }
  }

  const inner = (
    <>
      {!page && <SectionHeading title={copy.title} subtitle={copy.subtitle} />}

      <motion.form
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        onSubmit={handleCalculate}
        className="surface-panel mx-auto max-w-6xl p-6 md:p-8"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto] lg:items-end">
          <FormField label="I am investing in">
            <Select value={metalType} onValueChange={setMetalType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gold">Gold</SelectItem>
                <SelectItem value="silver">Silver</SelectItem>
                <SelectItem value="platinum">Platinum</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="For">
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6">6 Months</SelectItem>
                <SelectItem value="12">1 Year</SelectItem>
                <SelectItem value="24">2 Years</SelectItem>
                <SelectItem value="60">5 Years</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="I plan to invest" htmlFor="invest-amount">
            <Input
              id="invest-amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min={100}
            />
          </FormField>
          <FormField label="In">
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
          <FormField
            label="Calculate returns"
            labelClassName="sr-only"
            className="sm:col-span-2 lg:col-span-1"
          >
            <Button
              type="submit"
              variant="emerald"
              size="default"
              disabled={loading}
              className="h-10 w-full lg:w-auto"
            >
              {loading ? 'Calculating...' : 'Calculate My Returns'}
            </Button>
          </FormField>
        </div>

        {result && (
          <div className="mt-6 rounded-sm bg-cream p-4 text-center">
            <p className="text-desc">Projected value after investment period</p>
            <p ref={resultRef} className="mt-1 text-3xl text-gold sm:text-4xl lg:text-5xl">
              {formatCurrency(displayValue)}
            </p>
            <p className="mt-1 text-base text-primary-text md:text-lg">
              Estimated return: {formatCurrency(result.estimatedReturn)} (
              {result.percentageReturn.toFixed(1)}%)
            </p>
            <p className="mt-2 text-sm font-light text-muted-text md:text-base">
              {copy.disclaimer}
            </p>
          </div>
        )}
      </motion.form>
    </>
  )

  if (page) return inner

  return (
    <section id="calculator" className="bg-cream py-16 md:py-20">
      <Container>{inner}</Container>
    </section>
  )
}
