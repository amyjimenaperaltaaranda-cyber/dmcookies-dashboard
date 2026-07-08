// src/pages/Login/Login.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

export default function Login() {
  const navigate = useNavigate()
  
  // Estados locales del formulario
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [captchaToken, setCaptchaToken] = useState(null)

  // Estados globales de tu authStore
  const { login, session, loading, error } = useAuthStore()

  // Si el usuario ya cuenta con sesión activa, lo redirigimos automáticamente al Dashboard
  useEffect(() => {
    if (session) {
      navigate('/dashboard')
    }
  }, [session, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validación estructural básica previa
    if (!email || !password) return

    // Ejecutamos la función de tu store pasando las variables requeridas
    const result = await login(email, password, captchaToken)
    if (result?.success) {
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        
        {/* Encabezado del Formulario */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Panel de Acceso</h1>
          <p className="text-gray-500 text-sm">Proyecto DMCookies Dashboard</p>
        </div>

        {/* Alerta de Error Dinámica */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-lg border border-red-200">
            ⚠️ {error}
          </div>
        )}

        {/* Formulario Estructural */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Campo: Correo Electrónico */}
          <div>
            <label className="block text-sm font-medium mb-1">Correo Electrónico</label>
            <input
              type="email"
              required
              disabled={loading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@correo.com"
              className="w-full p-2 border rounded-lg disabled:opacity-50"
            />
          </div>

          {/* Campo: Contraseña */}
          <div>
            <label className="block text-sm font-medium mb-1">Contraseña</label>
            <input
              type="password"
              required
              disabled={loading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-2 border rounded-lg disabled:opacity-50"
            />
          </div>

          {/* ESPACIO TÉCNICO PARA HCAPTCHA */}
          <div className="flex justify-center py-2 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            {/* 
              Aquí tu compañero de diseño o tú insertarán el componente <HCaptcha />.
              Por ahora simula el comportamiento guardando un token ficticio al interactuar.
            */}
            <div className="text-center text-xs text-gray-400 p-2">
              [ Contenedor Estructural para hCaptcha ]
              <button 
                type="button"
                onClick={() => setCaptchaToken('token_de_prueba_123')}
                className="block mt-1 mx-auto text-[10px] text-amber-600 underline"
              >
                {captchaToken ? '✅ Captcha Resuelto' : 'Simular verificación de Captcha'}
              </button>
            </div>
          </div>

          {/* Botón de Envío con Estado de Carga */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {loading ? 'Procesando ingreso...' : 'Iniciar Sesión'}
          </button>

        </form>
      </div>
    </div>
  )
}