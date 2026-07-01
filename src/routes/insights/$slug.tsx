import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { getInsight } from '@/server/functions'
import { Container } from '@/components/shared/primitives'
import { links } from '@/lib/links'

export const Route = createFileRoute('/insights/$slug')({
  component: InsightArticlePage,
})

function InsightArticlePage() {
  const { slug } = Route.useParams()
  const { data: article, isLoading } = useQuery({
    queryKey: ['insight', slug],
    queryFn: () => getInsight({ data: slug }),
  })

  if (isLoading) return <Container className="py-16"><p>Loading…</p></Container>
  if (!article) return <Container className="py-16"><p>Article not found.</p></Container>

  return (
    <>
      <title>{article.title} | Prime Gold Trading</title>
      <article className="bg-white py-16 md:py-20">
        <Container className="max-w-3xl">
          <a href={links.insights} className="text-sm text-emerald-deep hover:underline">← Back to Insights</a>
          <h1 className="mt-4 text-heading text-primary-text">{article.title}</h1>
          <img src={article.imageUrl} alt="" className="mt-8 aspect-video w-full rounded-sm object-cover" />
          <div
            className="prose prose-sm mt-8 max-w-none text-primary-text md:prose-base"
            dangerouslySetInnerHTML={{ __html: article.body }}
          />
        </Container>
      </article>
    </>
  )
}
