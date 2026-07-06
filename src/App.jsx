// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/UI/ProtectedRoute'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import Consultas from './pages/Consultas/Consultas'
import About from './pages/About/About'
import Objectives from './pages/Objectives/Objectives'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/consultas"
          element={
            <ProtectedRoute>
              <Consultas />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/objectives" element={<Objectives />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App