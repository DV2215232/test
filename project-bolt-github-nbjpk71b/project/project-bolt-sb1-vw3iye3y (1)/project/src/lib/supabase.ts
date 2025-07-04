import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface LandingPageEntry {
  id: string
  name: string
  email: string
  phone: string
  created_at: string
  formatted_date: string
}

// Function to create a new landing page entry
export async function createLandingPageEntry(data: {
  name: string
  email: string
  phone: string
}) {
  const { data: entry, error } = await supabase
    .from('landing_page_entries')
    .insert([data])
    .select('*')
    .single()

  if (error) {
    throw error
  }

  return entry as LandingPageEntry
}

// Function to get all landing page entries (admin use)
export async function getLandingPageEntries() {
  const { data: entries, error } = await supabase
    .from('landing_page_entries')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return entries as LandingPageEntry[]
}

// Function to check if email already exists
export async function checkEmailExists(email: string) {
  const { data, error } = await supabase
    .from('landing_page_entries')
    .select('id')
    .eq('email', email)
    .single()

  if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" error
    throw error
  }

  return !!data
}