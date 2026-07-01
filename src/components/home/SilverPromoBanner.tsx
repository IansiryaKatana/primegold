import { motion } from 'framer-motion'
import { links } from '@/lib/links'
import { homeCopy } from '@/data/copy'
import { fadeUp } from '@/lib/motion'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/shared/primitives'

export function SilverPromoBanner() {
  return (
    <section id="silver" className="overflow-hidden bg-emerald-deep py-12 md:py-16">
      <Container>
        <div className="grid items-center gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <img
              src="/coins.png"
              alt="Prime Gold Trading coins"
              className="mx-auto max-h-72 w-full object-contain drop-shadow-2xl lg:mx-0"
            />
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <h2 className="text-4xl tracking-tight text-white md:text-5xl lg:text-6xl">
              {homeCopy.silver.title}
            </h2>
            <p className="mt-4 text-base font-extralight leading-relaxed text-white/80 md:text-lg">
              {homeCopy.silver.body}
            </p>
            <Button variant="gold" size="lg" className="mt-6" asChild>
              <a href={links.silver}>{homeCopy.silver.cta}</a>
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
