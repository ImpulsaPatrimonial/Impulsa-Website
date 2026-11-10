import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let client: SupabaseClient | null = null

if (!url || !anonKey) {
  console.warn(
    '[imppat] Faltan VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY. El cliente de Supabase no está disponible hasta configurarlas en .env.local.',
  )
} else {
  client = createClient(url, anonKey)
}

export const supabase = client
