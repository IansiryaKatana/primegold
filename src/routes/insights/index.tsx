import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { getInsights } from '@/server/functions'
import { Container } from '@/components/shared/primitives'
import { PageHero } from '@/components/pages/PageHero'
import { insightLink, links } from '@/lib/links'
import { metaCopy } from '@/data/copy/meta'

export const Route = createFileRoute('/insights/')({
  component: InsightsIndexPage,
})

function InsightsIndexPage() {
  const { data: articles = [] } = useQuery({
    queryKey: ['insights'],
    queryFn: () => getInsights(),
  })

  return (
    <>
      <title>{metaCopy.insights.title}</title>
      <meta name="description" content={metaCopy.insights.description} />
      <PageHero
        title="Gold & Silver Insights"
        subtitle="Expert guides on investing, storage, and market trends from the Prime Gold team."
        crumbs={[
          { label: 'Home', href: links.home },
          { label: 'Insights' },
        ]}
      />
      <section className="bg-white py-16 md:py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <a
                key={article.slug}
                href={insightLink(article.slug)}
                className="group overflow-hidden rounded-sm border border-warm-border"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={article.imageUrl}
                    alt=""
                    className="size-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-base text-primary-text md:text-lg">{article.title}</h2>
                  <p className="mt-1 text-sm text-muted-text">{article.excerpt}</p>
                </div>
              </a>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
