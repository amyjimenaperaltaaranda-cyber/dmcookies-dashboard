import { create } from 'zustand'
import { supabase } from '../utils/supabaseClient'

export const useAuthStore = create((set) => ({
  user: null,
  session: null,
  loading: true,

  init: async () => {
    const { data: { session } } = await supabase.auth.getSession()
    set({ session, user: session?.user ?? null, loading: false })

    supabase.auth.onAuthStateChange((_event, session) => {
      set({ session, user: session?.user ?? null })
    })
  },

  login: async (email, password, captchaToken) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
      options: { captchaToken }
    })
    if (error) throw error
    set({ session: data.session, user: data.user })
  },

  logout: async () => {
    await supabase.auth.signOut()
    set({ session: null, user: null })
  }
}))