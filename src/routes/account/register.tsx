'use client'

import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { MotionSection, RevealBlock } from '@/components/motion'
import { Container } from '@/components/shared/primitives'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getSupabaseBrowserClient, isSupabaseConfigured } from '@/lib/supabase/client'
import { links } from '@/lib/links'
import { toast } from 'sonner'

export const Route = createFileRoute('/account/register')({
  component: RegisterPage,
})

function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    if (!isSupabaseConfigured()) {
      toast.info('Demo mode: Supabase not configured.')
      window.location.href = links.account
      return
    }
    setLoading(true)
    const supabase = getSupabaseBrowserClient()!
    const { error } = await supabase.auth.signUp({ email, password })
    setLoading(false)
    if (error) toast.error(error.message)
    else {
      toast.success('Check your email to confirm your account.')
      window.location.href = links.account
    }
  }

  return (
    <MotionSection tier="d" className="bg-cream py-16">
      <Container className="max-w-md">
        <RevealBlock scroll={false}>
          <h1 className="text-heading text-primary-text">Create Account</h1>
        </RevealBlock>
        <form onSubmit={handleRegister} className="mt-8 flex flex-col gap-4 rounded-sm border border-warm-border bg-white p-6">
          <div><Label htmlFor="email">Email</Label><Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></div>
          <div><Label htmlFor="password">Password</Label><Input id="password" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} /></div>
          <Button type="submit" variant="emerald" disabled={loading}>{loading ? 'Creating…' : 'Register'}</Button>
        </form>
        <p className="mt-4 text-sm text-muted-text">
          Already have an account? <a href={links.login} className="text-emerald-deep hover:underline">Sign in</a>
        </p>
      </Container>
    </MotionSection>
  )
}
