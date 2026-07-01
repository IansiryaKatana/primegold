import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/lib/supabase/types'

export function isSupabaseServerConfigured() {
  return Boolean(
    process.env.VITE_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY,
  )
}

export function createServiceClient() {
  const url = process.env.VITE_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    throw new Error('Supabase server credentials not configured')
  }
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

export function getSupabaseServiceClient() {
  if (!isSupabaseServerConfigured()) return null
  return createServiceClient()
}
