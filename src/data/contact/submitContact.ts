import type { ContactPayload, ContactSubmitResult } from '@/types/contact'

const MOCK_LATENCY_MS = 800

function isMockSource(): boolean {
  const source = import.meta.env.VITE_DATA_SOURCE
  return !source || source === 'mock'
}

export async function submitContact(
  payload: ContactPayload,
): Promise<ContactSubmitResult> {
  if (isMockSource()) {
    await new Promise((resolve) => setTimeout(resolve, MOCK_LATENCY_MS))
    // Honeypot lleno: simula éxito silencioso (como la Edge Function).
    if (payload.website.trim()) return { ok: true }
    console.info('[contact] mock submit', payload)
    return { ok: true }
  }

  // Versión real (Supabase Edge Function) — activar con VITE_DATA_SOURCE=supabase.
  // import { supabase } from '@/lib/supabase'
  // if (!supabase) return { ok: false, error: 'server' }
  // const { data, error } = await supabase.functions.invoke('submit-contact', {
  //   body: payload,
  // })
  // if (error) {
  //   const status = (error as { context?: { status?: number } }).context?.status
  //   if (status === 429) return { ok: false, error: 'rate_limited' }
  //   if (status === 400) return { ok: false, error: 'validation' }
  //   return { ok: false, error: 'server' }
  // }
  // if (data && typeof data === 'object' && 'error' in data) {
  //   const code = (data as { error?: string }).error
  //   if (code === 'rate_limited') return { ok: false, error: 'rate_limited' }
  //   if (code === 'validation') return { ok: false, error: 'validation' }
  //   return { ok: false, error: 'server' }
  // }
  // return { ok: true }

  return { ok: false, error: 'server' }
}
