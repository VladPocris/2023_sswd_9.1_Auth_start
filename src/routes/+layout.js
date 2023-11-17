import { createBrowserClient } from '@supabase/ssr'

/*
The usage of depends tells sveltekit that this load function should be executed
whenever invalidate is called to keep the page store in sync.
*/

export const load = async ({ fetch, data, depends }) => {
  depends('supabase:auth')

  const supabase = createBrowserClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return { supabase, session }
}