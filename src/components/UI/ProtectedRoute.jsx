// src/components/UI/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore' 

export default function ProtectedRoute({ children }) {
  const session = useAuthStore((state) => state.session)

  // Si no hay una sesión activa, lo mandamos directo al Login
  if (!session) {
    return <Navigate to="/login" replace />
  }

  // Si el usuario está autenticado, lo dejamos pasar a la página
  return children
}