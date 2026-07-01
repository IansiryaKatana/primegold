import { aboutCopy, brand } from '@/data/copy'
import { links } from '@/lib/links'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/shared/primitives'
import { PageHero } from '@/components/pages/PageHero'
import { metaCopy } from '@/data/copy/meta'

export function AboutPageContent() {
  return (
    <>
      <title>{metaCopy.about.title}</title>
      <meta name="description" content={metaCopy.about.description} />
      <PageHero
        title={aboutCopy.title}
        subtitle={aboutCopy.subtitle}
        crumbs={[
          { label: 'Home', href: links.home },
          { label: 'About' },
        ]}
      />
      <section className="bg-white py-16 md:py-20">
        <Container className="max-w-3xl">
          <h2 className="text-2xl text-primary-text md:text-3xl">{aboutCopy.story.heading}</h2>
          <p className="mt-4 text-desc">{aboutCopy.story.body}</p>
          <p className="mt-4 text-desc">{brand.trustLine}</p>
        </Container>
      </section>
      <section className="bg-cream py-14">
        <Container>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {aboutCopy.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl text-gold md:text-4xl">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-text md:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section className="bg-white py-16 md:py-20">
        <Container>
          <h2 className="text-center text-2xl text-primary-text md:text-3xl">What We Stand For</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {aboutCopy.values.map((value) => (
              <div
                key={value.title}
                className="rounded-sm border border-warm-border p-6"
              >
                <h3 className="text-lg text-primary-text">{value.title}</h3>
                <p className="mt-2 text-desc">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section className="bg-emerald-deep py-14">
        <Container className="flex flex-col items-center text-center">
          <h2 className="text-2xl text-white md:text-3xl">{aboutCopy.cta.title}</h2>
          <p className="mt-3 max-w-lg text-white/80">{aboutCopy.cta.body}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button variant="gold" asChild>
              <a href={links.locations}>{aboutCopy.cta.primary}</a>
            </Button>
            <Button variant="outlineGold" asChild>
              <a href={links.shop}>{aboutCopy.cta.secondary}</a>
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
