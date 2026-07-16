// src/pages/Login/Login.jsx
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { useAuthStore } from '../../store/authStore'

import logoUniversidad from '../../assets/logos/logo-universidad.svg'
import logoEscuela from '../../assets/logos/logo-escuela.svg'
import logoGhostery from '../../assets/logos/logo-ghostery.svg'
import logoGoogleTrends from '../../assets/logos/logo-google-trends.svg'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [captchaToken, setCaptchaToken] = useState(null)
  const captchaRef = useRef(null)
  const login = useAuthStore((s) => s.login)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!captchaToken) {
      alert('Completa el CAPTCHA')
      return
    }
    try {
      await login(email, password, captchaToken)
      navigate('/dashboard')
    } catch (err) {
      alert(err.message)
    } finally {
      captchaRef.current?.resetCaptcha()
      setCaptchaToken(null)
    }
  }

  return (
    <div className="login-layout">
      {/* Panel de carátula */}
      <div className="login-cover">
        <div className="login-cover__institucional">
          <img src={logoUniversidad} alt="Universidad" className="login-logo" />
          <img src={logoEscuela} alt="Escuela profesional" className="login-logo" />
        </div>

        <div className="login-cover__proyecto">
          <h1>DMCookies</h1>
          <p>Analítica de desinformación en cookies</p>
        </div>

        <div className="login-cover__fuentes">
          <span className="login-cover__fuentes-label">Fuentes de datos</span>
          <img src={logoGhostery} alt="Ghostery" className="login-logo login-logo--small" />
          <img src={logoGoogleTrends} alt="Google Trends" className="login-logo login-logo--small" />
        </div>
      </div>

      {/* Panel de formulario */}
      <div className="login-form-panel">
        <form onSubmit={handleSubmit} className="login-form">
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Correo" required />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Contraseña" required />
          <HCaptcha ref={captchaRef} sitekey={import.meta.env.VITE_HCAPTCHA_SITE_KEY} onVerify={setCaptchaToken} />
          <button type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  )
}