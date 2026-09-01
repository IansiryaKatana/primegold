'use client'

import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { toast } from 'sonner'
import { MotionSection, RevealBlock } from '@/components/motion'
import { AppLink } from '@/components/shared/AppLink'
import { Container } from '@/components/shared/primitives'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { legalCopy } from '@/data/copy'
import { createKycCase } from '@/server/functions'
import { links } from '@/lib/links'

export const Route = createFileRoute('/checkout/kyc')({
  component: KycPage,
  validateSearch: (search: Record<string, unknown>) => ({
    order: (search.order as string) ?? '',
  }),
})

function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      resolve(result.split(',')[1] ?? '')
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function KycPage() {
  const { order } = Route.useSearch()
  const [email, setEmail] = useState('')
  const [docType, setDocType] = useState('drivers_license')
  const [file, setFile] = useState<File | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!file) {
      toast.error('Please upload a document.')
      return
    }
    setLoading(true)
    try {
      const fileData = await readFileAsBase64(file)
      await createKycCase({
        data: {
          orderNumber: order,
          email,
          docType,
          fileName: file.name,
          fileData,
        },
      })
      setSubmitted(true)
      toast.success('Documents submitted for review.')
    } catch {
      toast.error('Submission failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <MotionSection tier="d" className="bg-cream py-12 md:py-16">
      <Container className="max-w-lg">
        <RevealBlock scroll={false}>
          <h1 className="text-heading text-primary-text">{legalCopy.kyc.title}</h1>
          <p className="mt-4 text-sm text-muted-text md:text-base">{legalCopy.kyc.body}</p>
        </RevealBlock>
        {submitted ? (
          <p className="surface-callout mt-6 p-4 text-sm text-emerald-deep">
            {legalCopy.kyc.statusPending}
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="surface-panel mt-8 flex flex-col gap-4 p-6">
            <div>
              <Label htmlFor="email">Email</Label>
              <input id="email" required type="email" className="mt-1 w-full rounded-sm border border-warm-border px-3 py-2 text-sm" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <Label>Document Type</Label>
              <Select value={docType} onValueChange={setDocType}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="drivers_license">Driver&apos;s License</SelectItem>
                  <SelectItem value="passport">Passport</SelectItem>
                  <SelectItem value="state_id">State ID</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="file">{legalCopy.kyc.uploadLabel}</Label>
              <input id="file" required type="file" accept="image/*,.pdf" className="mt-1 w-full text-sm" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
            </div>
            <p className="text-xs text-muted-text">{legalCopy.kyc.retentionNote}</p>
            <Button type="submit" variant="emerald" disabled={loading}>
              {loading ? 'Submitting…' : legalCopy.kyc.submit}
            </Button>
          </form>
        )}
        <AppLink href={links.account} className="mt-4 inline-block text-sm text-emerald-deep hover:underline">
          Go to My Account
        </AppLink>
      </Container>
    </MotionSection>
  )
}
