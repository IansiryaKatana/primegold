'use client'

import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { getInsight } from '@/server/functions'
import { MotionSection, RevealBlock, RevealText } from '@/components/motion'
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
      <MotionSection tier="b" className="bg-white py-16 md:py-20">
        <Container className="max-w-3xl">
          <RevealBlock scroll={false}>
            <a href={links.insights} className="text-sm text-emerald-deep hover:underline">← Back to Insights</a>
          </RevealBlock>
          <RevealText as="h1" scroll={false} className="mt-4 text-heading text-primary-text">
            {article.title}
          </RevealText>
          <RevealBlock delay={0.15} className="mt-8">
            <img src={article.imageUrl} alt="" className="aspect-video w-full rounded-sm object-cover" />
          </RevealBlock>
          <RevealBlock delay={0.25} className="mt-8">
            <div
              className="prose prose-sm max-w-none text-primary-text md:prose-base"
              dangerouslySetInnerHTML={{ __html: article.body }}
            />
          </RevealBlock>
        </Container>
      </MotionSection>
    </>
  )
}
