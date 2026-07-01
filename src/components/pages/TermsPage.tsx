import { links } from '@/lib/links'
import { Container } from '@/components/shared/primitives'

export function TermsPage() {
  return (
    <Container className="max-w-3xl py-16 md:py-20">
      <h1 className="text-heading text-primary-text">Terms of Service</h1>
      <div className="mt-8 flex flex-col gap-4 text-desc">
        <p>
          By using Prime Gold Trading services, you agree to our terms for
          buying, selling, and appraising precious metals. All offers are
          subject to in-person verification and market conditions at time of
          transaction.
        </p>
        <p>
          Prices displayed online are estimates and may vary based on spot
          prices, purity testing, and product availability.
        </p>
        <p>
          Questions about these terms? Reach us at{' '}
          <a href={links.contact} className="text-gold hover:underline">
            our contact page
          </a>{' '}
          or call{' '}
          <a href="tel:18005550142" className="text-gold hover:underline">
            1-800-555-0142
          </a>
          .
        </p>
      </div>
    </Container>
  )
}
