'use client'

import { useState } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import { toast } from 'sonner'
import { brand, contactCopy } from '@/data/copy'
import { links } from '@/lib/links'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Container } from '@/components/shared/primitives'
import { PageHero } from '@/components/pages/PageHero'
import { LocationAppointmentSection } from '@/components/home/LocationAppointmentSection'
import { MotionSection, RevealBlock, StaggerGrid } from '@/components/motion'
import { submitContactMessage } from '@/server/functions'
import { metaCopy } from '@/data/copy/meta'

type ContactSubject = (typeof contactCopy.form.subjects)[number]

export function ContactPageContent() {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<{
    name: string
    email: string
    subject: ContactSubject
    message: string
  }>({
    name: '',
    email: '',
    subject: contactCopy.form.subjects[0],
    message: '',
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await submitContactMessage({ data: form })
      toast.success(contactCopy.form.success)
      setForm({ name: '', email: '', subject: contactCopy.form.subjects[0], message: '' })
    } catch {
      toast.error(contactCopy.form.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <title>{metaCopy.contact.title}</title>
      <meta name="description" content={metaCopy.contact.description} />
      <PageHero
        title={contactCopy.title}
        subtitle={contactCopy.subtitle}
        crumbs={[
          { label: 'Home', href: links.home },
          { label: 'Contact' },
        ]}
      />
      <MotionSection tier="b" className="bg-white py-16 md:py-20">
        <Container>
          <StaggerGrid className="grid gap-6 md:grid-cols-3" stagger={0.1}>
            <a
              href={`tel:${brand.phone.replace(/\D/g, '')}`}
              className="flex flex-col gap-3 rounded-sm border border-warm-border p-6 transition-shadow hover:shadow-md"
            >
              <Phone className="size-6 text-gold" aria-hidden />
              <h2 className="text-lg text-primary-text">{contactCopy.channels[0].title}</h2>
              <p className="text-sm text-muted-text">{contactCopy.channels[0].description}</p>
              <p className="mt-auto text-gold">{brand.phone}</p>
            </a>
            <a
              href={`mailto:${brand.email}`}
              className="flex flex-col gap-3 rounded-sm border border-warm-border p-6 transition-shadow hover:shadow-md"
            >
              <Mail className="size-6 text-gold" aria-hidden />
              <h2 className="text-lg text-primary-text">{contactCopy.channels[1].title}</h2>
              <p className="text-sm text-muted-text">{contactCopy.channels[1].description}</p>
              <p className="mt-auto break-all text-gold">{brand.email}</p>
            </a>
            <a
              href={links.locations}
              className="flex flex-col gap-3 rounded-sm border border-warm-border p-6 transition-shadow hover:shadow-md"
            >
              <MapPin className="size-6 text-gold" aria-hidden />
              <h2 className="text-lg text-primary-text">{contactCopy.channels[2].title}</h2>
              <p className="text-sm text-muted-text">{contactCopy.channels[2].description}</p>
              <p className="mt-auto text-gold">{contactCopy.channels[2].action}</p>
            </a>
          </StaggerGrid>

          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <div>
              <RevealBlock>
                <h2 className="text-2xl text-primary-text">{contactCopy.form.title}</h2>
                <p className="mt-2 text-desc">{contactCopy.form.subtitle}</p>
              </RevealBlock>
              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="contact-name">{contactCopy.form.nameLabel}</Label>
                  <Input
                    id="contact-name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="contact-email">{contactCopy.form.emailLabel}</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>{contactCopy.form.subjectLabel}</Label>
                  <Select
                    value={form.subject}
                    onValueChange={(v) => setForm({ ...form, subject: v as ContactSubject })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {contactCopy.form.subjects.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="contact-message">{contactCopy.form.messageLabel}</Label>
                  <Textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>
                <Button type="submit" variant="emerald" disabled={loading}>
                  {loading ? 'Sending…' : contactCopy.form.submit}
                </Button>
              </form>
            </div>
            <RevealBlock delay={0.15}>
              <div className="rounded-sm border border-warm-border bg-cream/50 p-6">
              <h3 className="text-lg text-primary-text">Head Office</h3>
              <address className="mt-4 space-y-2 text-desc not-italic">
                <p>{brand.address}</p>
                <p>{brand.hours}</p>
                <p>
                  <a href={`tel:${brand.phone.replace(/\D/g, '')}`} className="text-gold hover:underline">
                    {brand.phone}
                  </a>
                </p>
                <p>
                  <a href={`mailto:${brand.email}`} className="text-gold hover:underline">
                    {brand.email}
                  </a>
                </p>
              </address>
              </div>
            </RevealBlock>
          </div>
        </Container>
      </MotionSection>
      <LocationAppointmentSection />
    </>
  )
}
