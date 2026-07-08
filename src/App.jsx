// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/UI/ProtectedRoute'
import MainLayout from './components/Layout/MainLayout' // Importamos el nuevo contenedor con Sidebar
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import Consultas from './pages/Consultas/Consultas'
import About from './pages/About/About'
import Objectives from './pages/Objectives/Objectives'
import Problematica from './pages/Problematica/Problematica'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública: Login (No lleva menú lateral) */}
        <Route path="/login" element={<Login />} />
        
        {/* Rutas privadas: Protegidas por sesión y envueltas en el MainLayout */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/consultas"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Consultas />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <MainLayout>
                <About />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/objectives"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Objectives />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/problematica"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Problematica />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Redirección por defecto */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App