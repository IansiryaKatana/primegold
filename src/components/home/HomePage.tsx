import { useQuery } from '@tanstack/react-query'
import { getHomepageContent } from '@/server/functions'
import { HeroSellJewelry } from '@/components/home/HeroSellJewelry'
import { TrustIntro, TrustMetricStrip } from '@/components/home/TrustSections'
import { BestSellingProducts } from '@/components/home/BestSellingProducts'
import { InvestmentCalculator } from '@/components/home/InvestmentCalculator'
import { InsightsCarousel } from '@/components/home/InsightsCarousel'
import { SilverPromoBanner } from '@/components/home/SilverPromoBanner'
import { LocationAppointmentSection } from '@/components/home/LocationAppointmentSection'
import { ComparisonSection } from '@/components/home/ComparisonSection'
import { FAQSection } from '@/components/home/FAQSection'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
export function HomePage() {
  const { data } = useQuery({
    queryKey: ['homepage-content'],
    queryFn: () => getHomepageContent(),
  })

  return (
    <>
      <HeroSellJewelry />
      <TrustIntro />
      <TrustMetricStrip />
      <BestSellingProducts />
      <InvestmentCalculator />
      <InsightsCarousel articles={data?.insights ?? []} />
      <SilverPromoBanner />
      <LocationAppointmentSection />
      <ComparisonSection rows={data?.comparisonRows ?? []} />
      <FAQSection faqs={data?.faqs ?? []} />
      <TestimonialsSection
        testimonials={data?.testimonials ?? []}
        pressLogos={data?.pressLogos ?? []}
      />
    </>
  )
}
