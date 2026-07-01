import { links } from '@/lib/links'
import { Container } from '@/components/shared/primitives'

export function PrivacyPage() {
  return (
    <Container className="max-w-3xl py-16 md:py-20">
      <h1 className="text-heading text-primary-text">Privacy Policy</h1>
      <div className="mt-8 flex flex-col gap-4 text-desc">
        <p>
          Prime Gold Trading respects your privacy. We collect only the
          information necessary to process transactions, appointments, and
          customer support requests.
        </p>
        <p>
          We do not sell your personal information to third parties. Data is
          stored securely and used in accordance with applicable regulations.
        </p>
        <p>
          For privacy-related questions, contact us at{' '}
          <a
            href="mailto:info@primegoldtrading.com"
            className="text-gold hover:underline"
          >
            info@primegoldtrading.com
          </a>{' '}
          or visit our{' '}
          <a href={links.contact} className="text-gold hover:underline">
            contact page
          </a>
          .
        </p>
      </div>
    </Container>
  )
}
