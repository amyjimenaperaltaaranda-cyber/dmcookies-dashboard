import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

export default function ProtectedRoute({ children }) {
  const { session, loading } = useAuthStore()

  if (loading) return <div>Cargando...</div>
  if (!session) return <Navigate to="/login" replace />

  return children
}