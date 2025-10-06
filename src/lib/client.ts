import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

// Fallback-friendly Supabase client for the frontend
const SUPABASE_URL = (import.meta as any)?.env?.VITE_SUPABASE_URL || 'https://xgnojdjxtqywltlxjupd.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = (import.meta as any)?.env?.VITE_SUPABASE_PUBLISHABLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhnbm9qZGp4dHF5d2x0bHhqdXBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1OTcyMDYsImV4cCI6MjA3NTE3MzIwNn0.-UQMkAIqju351uhkiKrPQ26M09RFYvBkVMXWG9OG2N4';

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});
