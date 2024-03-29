
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export const getURL = () => {
    let url = process?.env?.NEXT_PUBLIC_VERCEL_URL ?? 
    'http://localhost:3002/'
      // process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
      // Automatically set by Vercel.
      
    // Make sure to include `https://` when not localhost.
    url = url.includes('http') ? url : `https://${url}`
    // Make sure to include a trailing `/`.
    url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
    return url
  }