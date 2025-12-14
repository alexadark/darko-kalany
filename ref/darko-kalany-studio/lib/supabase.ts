import { createClient } from '@supabase/supabase-js';

// CONFIGURATION
// In a real app, these should be in .env files (e.g., import.meta.env.VITE_SUPABASE_URL)
export const SUPABASE_URL = 'https://your-project-id.supabase.co'; 
export const SUPABASE_ANON_KEY = 'your-anon-key';

// Initialize the client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helper to check if Supabase is actually configured
export const isSupabaseConfigured = () => {
  return SUPABASE_URL !== 'https://your-project-id.supabase.co';
};

// Helper to get full public URL for an image stored in Supabase Storage
export const getStorageUrl = (path: string) => {
  if (!path) return '';
  if (path.startsWith('http')) return path; // Already a full URL
  
  const { data } = supabase.storage.from('portfolio-images').getPublicUrl(path);
  return data.publicUrl;
};