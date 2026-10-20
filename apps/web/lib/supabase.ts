import { createClient, type SupabaseClient } from "@supabase/supabase-js"

let adminClient: SupabaseClient | undefined

export function getSupabaseAdminClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !service) throw new Error("Supabase admin disabled. Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.")
  if (!adminClient) {
    adminClient = createClient(url, service, { auth: { persistSession: false } })
  }
  return adminClient
}
