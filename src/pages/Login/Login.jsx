// src/pages/Login/Login.jsx
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { useAuthStore } from '../../store/authStore'

// Importaciones de logos
import logoUniversidad from '../../assets/logos/logo-universidad.svg'
import logoEscuela from '../../assets/logos/logo-escuela.svg'
import logoGhostery from '../../assets/logos/logo-ghostery.svg'
import logoGoogleTrends from '../../assets/logos/logo-google-trends.svg'

export default function Login() {
  const navigate = useNavigate()
  const captchaRef = useRef(null)
  const siteKey = import.meta.env.VITE_HCAPTCHA_SITE_KEY

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [captchaToken, setCaptchaToken] = useState(null)

  const { login, session, loading, error } = useAuthStore()

  useEffect(() => {
    if (session) {
      navigate('/dashboard')
    }
  }, [session, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!captchaToken) {
      alert('Completa el CAPTCHA')
      return
    }
    try {
      const result = await login(email, password, captchaToken)
      if (result?.success) {
        navigate('/dashboard')
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err)
    } finally {
      captchaRef.current?.resetCaptcha()
      setCaptchaToken(null)
    }
  }

  return (
    <div className="login-layout">
      
      {/* Panel de carátula con distribución de 3 columnas */}
      <div className="login-cover">
        
        {/* COLUMNA IZQUIERDA: Logos Institucionales */}
        <div className="login-cover__col login-cover__col--left">
          <img src={logoUniversidad} alt="Universidad" className="login-logo login-logo--shadow" />
          <img src={logoEscuela} alt="Escuela profesional" className="login-logo login-logo--shadow" />
        </div>

        {/* COLUMNA CENTRAL: Información del Proyecto */}
        <div className="login-cover__col login-cover__col--center">
          <h1>DMCookies</h1>
          <p>Analítica de desinformación en cookies</p>
        </div>

        {/* COLUMNA DERECHA: Fuentes de Datos */}
        <div className="login-cover__col login-cover__col--right">
          <span className="login-cover__fuentes-label">Fuentes de datos</span>
          <div className="login-cover__fuentes-logos">
            <img src={logoGhostery} alt="Ghostery" className="login-logo login-logo--small login-logo--shadow" />
            <img src={logoGoogleTrends} alt="Google Trends" className="login-logo login-logo--small login-logo--shadow" />
          </div>
        </div>

      </div>

      {/* Panel del formulario de inicio de sesión */}
      <div className="login-form-panel">
        <form onSubmit={handleSubmit} className="login-form">
          <h2 className="text-xl font-bold mb-4 text-center">Panel de Acceso</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 text-xs rounded-lg border border-red-200">
              ⚠️ {error}
            </div>
          )}

          <div className="space-y-4">
            <input 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              type="email" 
              placeholder="Correo" 
              disabled={loading}
              required 
            />
            
            <input 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              type="password" 
              placeholder="Contraseña" 
              disabled={loading}
              required 
            />
            
            <div className="flex justify-center py-2">
              <HCaptcha 
                ref={captchaRef} 
                sitekey={siteKey} 
                onVerify={setCaptchaToken} 
                onExpire={() => setCaptchaToken(null)}
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading || !captchaToken}
              className="w-full"
            >
              {loading ? 'Procesando...' : 'Ingresar'}
            </button>
          </div>
        </form>
      </div>

    </div>
  )
}
