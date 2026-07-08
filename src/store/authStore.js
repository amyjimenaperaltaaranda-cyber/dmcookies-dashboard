// src/store/authStore.js
import { create } from 'zustand'
import { supabase } from '../utils/supabaseClient'

export const useAuthStore = create((set) => ({
  user: null,
  session: null,
  loading: true,
  error: null,

  // Inicializar y escuchar cambios de sesión automáticos
  initializeAuth: async () => {
    set({ loading: true })
    
    // 1. Obtener sesión actual al cargar la app
    const { data: { session } } = await supabase.auth.getSession()
    set({ 
      session, 
      user: session?.user ?? null, 
      loading: false 
    })

    // 2. Escuchar cambios en tiempo real (login, logout, token expirado)
    supabase.auth.onAuthStateChange((_event, session) => {
      set({ 
        session, 
        user: session?.user ?? null, 
        loading: false 
      })
    })
  },

  // Función para Iniciar Sesión con Email y Contraseña
  login: async (email, password, captchaToken) => {
    set({ loading: true, error: null })
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
      options: {
        // Aquí se pasa el token de hCaptcha
        captchaToken: captchaToken, 
      },
    })

    if (error) {
      set({ error: error.message, loading: false })
      return { success: false, error: error.message }
    }

    set({ session: data.session, user: data.user, loading: false })
    return { success: true }
  },

  // Función para Cerrar Sesión
  logout: async () => {
    set({ loading: true })
    const { error } = await supabase.auth.signOut()
    if (!error) {
      set({ user: null, session: null, loading: false, error: null })
    } else {
      set({ loading: false, error: error.message })
    }
  }
}))