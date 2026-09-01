import type { FAQ } from '@/lib/types'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

type FaqAccordionProps = {
  faqs: readonly FAQ[]
  className?: string
  columns?: 1 | 2
}

export function FaqAccordion({ faqs, className, columns = 1 }: FaqAccordionProps) {
  if (columns === 2) {
    const mid = Math.ceil(faqs.length / 2)
    const left = faqs.slice(0, mid)
    const right = faqs.slice(mid)
    return (
      <div className={cn('grid gap-8 md:grid-cols-2', className)}>
        <FaqAccordion faqs={left} />
        <FaqAccordion faqs={right} />
      </div>
    )
  }

  return (
    <Accordion type="single" collapsible className={className}>
      {faqs.map((faq) => (
        <AccordionItem key={faq.id} value={faq.id} className="faq-accordion-item">
          <AccordionTrigger className="text-left text-primary-text">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-muted-text">{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
