'use client'

import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { MotionSection, RevealBlock } from '@/components/motion'
import { AppLink } from '@/components/shared/AppLink'
import { Container } from '@/components/shared/primitives'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getSupabaseBrowserClient, isSupabaseConfigured } from '@/lib/supabase/client'
import { links } from '@/lib/links'
import { toast } from 'sonner'

export const Route = createFileRoute('/account/login')({
  component: LoginPage,
})

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!isSupabaseConfigured()) {
      toast.info('Demo mode: Supabase not configured. Account features use local storage.')
      window.location.href = links.account
      return
    }
    setLoading(true)
    const supabase = getSupabaseBrowserClient()!
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) toast.error(error.message)
    else {
      localStorage.setItem('pgt_demo_email', email)
      window.location.href = links.account
    }
  }

  return (
    <MotionSection tier="d" className="bg-cream py-16">
      <Container className="max-w-md">
        <RevealBlock scroll={false}>
          <h1 className="text-heading text-primary-text">Sign In</h1>
        </RevealBlock>
        <form onSubmit={handleLogin} className="surface-panel mt-8 flex flex-col gap-4 p-6">
          <div><Label htmlFor="email">Email</Label><Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></div>
          <div><Label htmlFor="password">Password</Label><Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} /></div>
          <Button type="submit" variant="emerald" disabled={loading}>{loading ? 'Signing in…' : 'Sign In'}</Button>
        </form>
        <p className="mt-4 text-sm text-muted-text">
          No account? <AppLink href={links.register} className="text-emerald-deep hover:underline">Register</AppLink>
        </p>
      </Container>
    </MotionSection>
  )
}
