// src/pages/Login/Login.jsx
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { useAuthStore } from '../../store/authStore'

import './Login.css'

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

      {/* Capa de ambiente: humo/vapor + partículas, puramente decorativa */}
      <div className="login-ambient" aria-hidden="true">
        <span className="login-smoke login-smoke--1" />
        <span className="login-smoke login-smoke--2" />
        <span className="login-smoke login-smoke--3" />
        <span className="login-particle login-particle--1" />
        <span className="login-particle login-particle--2" />
        <span className="login-particle login-particle--3" />
        <span className="login-particle login-particle--4" />
        <span className="login-particle login-particle--5" />
      </div>

      {/* Columna izquierda: fuentes de datos */}
      <div className="login-side login-side--sources">
        <span className="login-side__label">Fuentes de datos</span>
        <img src={logoGhostery} alt="Ghostery" className="login-logo login-logo--source login-logo--float" />
        <img src={logoGoogleTrends} alt="Google Trends" className="login-logo login-logo--source login-logo--float" />
      </div>

      {/* Centro: formulario de cristal */}
      <div className="login-form-panel">
        <form onSubmit={handleSubmit} className="login-form">
          <h1 className="login-form__title">DMCookies</h1>
          <p className="login-form__subtitle">Analítica de desinformación en cookies</p>

          {error && (
            <div className="login-form__error">
              ⚠️ {error}
            </div>
          )}

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

          <button type="submit" disabled={loading || !captchaToken}>
            {loading ? 'Procesando...' : 'Ingresar'}
          </button>
        </form>
      </div>

      {/* Columna derecha: logos académicos */}
      <div className="login-side login-side--academic">
        <img src={logoUniversidad} alt="Universidad" className="login-logo login-logo--academic login-logo--float" />
        <img src={logoEscuela} alt="Escuela profesional" className="login-logo login-logo--academic login-logo--float" />
      </div>

    </div>
  )
}