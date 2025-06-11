import { createClient, SupabaseClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://hwahvyubvqchwcbvndtd.supabase.co'; // e.g., https://abcde12345.supabase.co
export const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3YWh2eXVidnFjaHdjYnZuZHRkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTYyMzYyOCwiZXhwIjoyMDY1MTk5NjI4fQ.PB3ijDRwmB237pleeObaWJDPyz1rogeTgrV1JH0Jo5M'; // e.g., eyJhbGciOiJIUzI1Ni...

export const supabase: SupabaseClient = createClient(
  supabaseUrl,
  supabaseAnonKey
);
