// src/pages/Login/Login.jsx
import { useState, useEffect, useRef } from 'react' 
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import HCaptcha from '@hcaptcha/react-hcaptcha' // Componente real conectado

export default function Login() {
  const navigate = useNavigate()
  const captchaRef = useRef(null) // Referencia para controlar el ciclo de vida del captcha
  const siteKey = import.meta.env.VITE_HCAPTCHA_SITE_KEY 

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
    
    // Validación estructural previa (Exigimos correo, clave y que el captcha esté resuelto)
    if (!email || !password || !captchaToken) return

    // Ejecutamos la función de tu store pasando las variables requeridas
    const result = await login(email, password, captchaToken)
    
    if (result?.success) {
      navigate('/dashboard')
    } else {
      // ⚡ Si el inicio de sesión falla (ej: clave incorrecta), reseteamos el hCaptcha visualmente
      captchaRef.current?.resetCaptcha()
      setCaptchaToken(null)
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

          {/* ESPACIO REAL PARA INTEGRACIÓN DE HCAPTCHA */}
          <div className="flex justify-center py-2">
            <HCaptcha
              sitekey={siteKey}
              ref={captchaRef}
              onVerify={(token) => setCaptchaToken(token)}
              onExpire={() => setCaptchaToken(null)}
            />
          </div>

          {/* Botón de Envío con Estado de Carga */}
          <button
            type="submit"
            disabled={loading || !captchaToken} // Deshabilitado si está procesando o si no ha marcado el captcha
            className="w-full py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {loading ? 'Procesando ingreso...' : 'Iniciar Sesión'}
          </button>

        </form>
      </div>
    </div>
  )
}