// src/store/authStore.js
import { create } from 'zustand';
import { auth } from '../utils/firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

export const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  error: null,

  login: async (email, password) => {
    try {
      set({ loading: true, error: null });
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      set({ user: userCredential.user, loading: false });
      return { success: true };
    } catch (error) {
      set({ error: error.message, loading: false });
      return { success: false, error: error.message };
    }
  },

  logout: async () => {
    try {
      await signOut(auth);
      set({ user: null });
    } catch (error) {
      set({ error: error.message });
    }
  },

  setUser: (user) => set({ user, loading: false }),
  setLoading: (loading) => set({ loading }),
}));

// Escuchar cambios en autenticación
onAuthStateChanged(auth, (user) => {
  const { setUser } = useAuthStore.getState();
  setUser(user);
});