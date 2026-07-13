// src/App.jsx
import { useEffect } from 'react' // 1. Importamos useEffect
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore' // 2. Importamos tu store de Zustand
import ProtectedRoute from './components/UI/ProtectedRoute'
import MainLayout from './components/Layout/MainLayout'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import Consultas from './pages/Consultas/Consultas'
import About from './pages/About/About'
import Objectives from './pages/Objectives/Objectives'
import Problematica from './pages/Problematica/Problematica'

function App() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth)
  const loading = useAuthStore((state) => state.loading)

  useEffect(() => {
    initializeAuth()
}, [initializeAuth])

  // 4. Si está verificando la sesión, mostramos un spinner para que no parpadee la pantalla
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
        <span className="ml-3 font-medium">Verificando sesión...</span>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública */}
        <Route path="/login" element={<Login />} />
        
        {/* Rutas privadas */}
        <Route path="/dashboard" element={<ProtectedRoute><MainLayout><Dashboard /></MainLayout></ProtectedRoute>} />
        <Route path="/consultas" element={<ProtectedRoute><MainLayout><Consultas /></MainLayout></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><MainLayout><About /></MainLayout></ProtectedRoute>} />
        <Route path="/objectives" element={<ProtectedRoute><MainLayout><Objectives /></MainLayout></ProtectedRoute>} />
        <Route path="/problematica" element={<ProtectedRoute><MainLayout><Problematica /></MainLayout></ProtectedRoute>} />

        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App