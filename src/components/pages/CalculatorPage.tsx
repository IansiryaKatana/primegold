import { calculatorPageCopy } from '@/data/copy'
import { links } from '@/lib/links'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/shared/primitives'
import { PageHero } from '@/components/pages/PageHero'
import { InvestmentCalculator } from '@/components/home/InvestmentCalculator'
import { metaCopy } from '@/data/copy/meta'
import { Check } from 'lucide-react'

export function CalculatorPage() {
  return (
    <>
      <title>{metaCopy.calculator.title}</title>
      <meta name="description" content={metaCopy.calculator.description} />
      <PageHero
        title={calculatorPageCopy.title}
        subtitle={calculatorPageCopy.subtitle}
        crumbs={[
          { label: 'Home', href: links.home },
          { label: 'Investment Calculator' },
        ]}
      />
      <section className="bg-cream py-16 md:py-20">
        <Container>
          <InvestmentCalculator page />
        </Container>
      </section>
      <section className="bg-white py-16 md:py-20">
        <Container>
          <h2 className="text-center text-2xl text-primary-text md:text-3xl">
            {calculatorPageCopy.howItWorks.title}
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {calculatorPageCopy.howItWorks.steps.map((step, i) => (
              <div
                key={step.title}
                className="rounded-sm border border-warm-border bg-white p-6 text-center"
              >
                <span className="inline-flex size-10 items-center justify-center rounded-full bg-emerald-deep text-lg text-gold">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg text-primary-text">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-text md:text-base">{step.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section className="bg-cream py-16 md:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl text-primary-text md:text-3xl">
              {calculatorPageCopy.education.title}
            </h2>
            <ul className="mt-6 flex flex-col gap-3">
              {calculatorPageCopy.education.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-desc">
                  <Check className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-sm border border-warm-border bg-white p-8 text-center">
            <h3 className="text-xl text-primary-text">{calculatorPageCopy.cta.title}</h3>
            <p className="mt-3 text-desc">{calculatorPageCopy.cta.body}</p>
            <Button variant="gold" className="mt-6" asChild>
              <a href={links.shop}>{calculatorPageCopy.cta.button}</a>
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
