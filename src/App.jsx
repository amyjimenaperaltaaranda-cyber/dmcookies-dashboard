// src/App.jsx
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
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

  if (loading) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen text-white gap-4"
        style={{
          background:
            'radial-gradient(circle at 50% 40%, rgba(255, 176, 90, 0.18), transparent 55%), linear-gradient(160deg, #2b1608 0%, #3b1f0d 35%, #1c0e05 100%)',
        }}
      >
        <svg viewBox="0 0 100 100" className="w-16 h-16" style={{ animation: 'spin 2.6s linear infinite' }}>
          <circle cx="50" cy="50" r="42" fill="#d9922f" stroke="#8a520d" strokeWidth="4" />
          <path d="M 80 22 Q 93 34 85 54 Q 73 49 80 22 Z" fill="#1c0e05" />
          <circle cx="34" cy="34" r="5.5" fill="#5c3317" />
          <circle cx="60" cy="28" r="4" fill="#5c3317" />
          <circle cx="66" cy="62" r="5" fill="#5c3317" />
          <circle cx="38" cy="65" r="4.5" fill="#5c3317" />
          <circle cx="52" cy="48" r="3.5" fill="#5c3317" />
          <circle cx="26" cy="52" r="3" fill="#5c3317" />
        </svg>
        <span className="font-medium tracking-wide">Horneando tu sesión...</span>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública */}
        <Route path="/login" element={<Login />} />

        {/* Rutas privadas — flujo del profesor:
            Login → Problemática → Objetivos → Consultas → Dashboard → Sobre Nosotros */}
        <Route path="/problematica" element={
          <ProtectedRoute><MainLayout><Problematica /></MainLayout></ProtectedRoute>
        } />
        <Route path="/objectives" element={
          <ProtectedRoute><MainLayout><Objectives /></MainLayout></ProtectedRoute>
        } />
        <Route path="/consultas" element={
          <ProtectedRoute><MainLayout><Consultas /></MainLayout></ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute><MainLayout><Dashboard /></MainLayout></ProtectedRoute>
        } />
        <Route path="/about" element={
          <ProtectedRoute><MainLayout><About /></MainLayout></ProtectedRoute>
        } />

        {/* Raíz redirige al login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
