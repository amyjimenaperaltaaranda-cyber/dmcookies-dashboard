import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { useAuthStore } from '../../store/authStore'

import './Login.css'

import logoUniversidad from '../../assets/logos/logo-universidad.svg'
import logoEscuela from '../../assets/logos/logo-escuela.svg'
import logoGhostery from '../../assets/logos/logo-ghostery.svg'
import logoGoogleTrends from '../../assets/logos/logo-google-trends.svg'
import logoCookie from '../../assets/cookie.png' 

export default function Login() {
  const navigate = useNavigate()
  const captchaRef = useRef(null)
  const siteKey = import.meta.env.VITE_HCAPTCHA_SITE_KEY

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [captchaToken, setCaptchaToken] = useState(null)

  const { login, session, loading, error } = useAuthStore()

  // --- ESTADOS PARA LA LUPA INTERACTIVA ---
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    if (session) {
      navigate('/dashboard')
    }
  }, [session, navigate])

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    // Calculamos la posición relativa del mouse dentro del contenedor de la galleta
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePos({ x, y })
  }

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
      {/* Capas de ambiente */}
      <div className="login-ambient">
        <div className="login-smoke login-smoke--1"></div>
        <div className="login-smoke login-smoke--2"></div>
        <div className="login-smoke login-smoke--3"></div>
        <div className="login-particle login-particle--1"></div>
        <div className="login-particle login-particle--2"></div>
        <div className="login-particle login-particle--3"></div>
        <div className="login-particle login-particle--4"></div>
        <div className="login-particle login-particle--5"></div>
      </div>

      {/* COLUMNA IZQUIERDA */}
      <div className="login-side login-side--academic">
        <span className="login-side__label">Académicos</span>
        <img src={logoUniversidad} alt="Universidad" className="login-logo--academic login-logo--float" />
        <img src={logoEscuela} alt="Escuela profesional" className="login-logo--academic login-logo--float" />
      </div>

      {/* FORMULARIO CRISTAL (CENTRO) */}
      <div className="login-form-panel">
        <form onSubmit={handleSubmit} className="login-form">
          
          {/* 🌟 NUEVO: CONTENEDOR DE LA GALLETA Y LA LUPA INTERACTIVA */}
          <div 
            className="cookie-scanner"
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Galleta Base ( Pixel Art PNG) */}
            <div className="cookie-base">
              <img src={logoCookie} alt="DMCookie Pixel Art" className="cookie-pixel" />
            </div>

            {/* Lupa con lente de rayos X (Solo se ve cuando el mouse está encima) */}
            <div 
              className="scanner-lens"
              style={{
                left: `${mousePos.x}px`,
                top: `${mousePos.y}px`,
                opacity: isHovering ? 1 : 0,
                transform: `translate(-50%, -50%) scale(${isHovering ? 1 : 0.8})`
              }}
            >
              {/* Contenido analítico "dentro" de la lupa */}
              <div 
                className="scanner-lens__overlay"
                style={{
                  // Desplazamos el fondo en sentido opuesto para que coincida perfectamente con la galleta de abajo
                  transform: `translate(calc(-50% - ${mousePos.x - 75}px), calc(-50% - ${mousePos.y - 75}px))`
                }}
              >
                {/* Versión analítica de la galleta (Código, engranajes o chips de chocolate digital) */}
                <div className="cookie-digital">
                  <span>{"{ 0101 }"}</span>
                </div>
              </div>
            </div>
          </div>

          <h2 className="login-form__title">DMCookies</h2>
          <p className="login-form__subtitle">Analítica de desinformación en cookies</p>
          
          {error && (
            <div className="login-form__error">
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
            
            <div className="login-form__captcha">
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
            >
              {loading ? 'Procesando...' : 'Ingresar'}
            </button>
          </div>
        </form>
      </div>

      {/* COLUMNA DERECHA */}
      <div className="login-side login-side--sources">
        <span className="login-side__label">Fuentes de datos</span>
        <img src={logoGhostery} alt="Ghostery" className="login-logo--source login-logo--float" />
        <img src={logoGoogleTrends} alt="Google Trends" className="login-logo--source login-logo--float" />
      </div>

    </div>
  )
}