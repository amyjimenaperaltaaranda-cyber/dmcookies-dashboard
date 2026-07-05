import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { useAuthStore } from '../../store/authStore'

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
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
      <HCaptcha
        ref={captchaRef}
        sitekey={import.meta.env.VITE_HCAPTCHA_SITE_KEY}
        onVerify={setCaptchaToken}
      />
      <button type="submit">Ingresar</button>
    </form>
  )
}