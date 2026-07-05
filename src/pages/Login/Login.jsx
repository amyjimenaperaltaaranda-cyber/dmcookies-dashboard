// src/pages/Login/Login.jsx
import { useState } from 'react'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { useAuthStore } from '../../store/authStore'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [captchaToken, setCaptchaToken] = useState(null)
  const login = useAuthStore((s) => s.login)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!captchaToken) {
      alert('Completa el CAPTCHA')
      return
    }
    try {
      await login(email, password, captchaToken)
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
      <HCaptcha
        sitekey={import.meta.env.VITE_HCAPTCHA_SITE_KEY}
        onVerify={setCaptchaToken}
      />
      <button type="submit">Ingresar</button>
    </form>
  )
}