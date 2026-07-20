// src/components/Layout/Sidebar.jsx
import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

import iconProblematica from '../../assets/logos/problematica.svg'
import iconObjetivo     from '../../assets/logos/objetivo.svg'
import iconConsultas    from '../../assets/logos/Consultas.svg'
import iconDashboard    from '../../assets/logos/Dashboard.svg'
import iconAbout        from '../../assets/logos/About.svg'
import iconDiccionario  from '../../assets/logos/diccionario.svg'

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  const location = useLocation()
  const logout = useAuthStore((state) => state.logout)

  const menuItems = [
    { name: 'Problemática',   path: '/problematica', icon: iconProblematica },
    { name: 'Objetivos',      path: '/objectives',   icon: iconObjetivo     },
    { name: 'Consultas',      path: '/consultas',    icon: iconConsultas    },
    { name: 'Dashboard',      path: '/dashboard',    icon: iconDashboard    },
    { name: 'Sobre Nosotros', path: '/about',        icon: iconAbout        },
    { name: 'Diccionario de Datos', path: '/diccionario', icon: iconDiccionario },
  ]

  return (
    <div className={`sidebar-cookie z-50 h-screen text-white fixed left-0 top-0 p-4 flex flex-col justify-between transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-56'}`}>

      {/* PARTE SUPERIOR: Logo y Botón de Colapso */}
      <div>
        <div className="flex items-center justify-between mb-8 px-2 py-2 border-b border-black/25">
          {!isCollapsed && (
            <span className="font-bold text-lg drop-shadow-sm">DMCookies 🍪</span>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded bg-black/25 hover:bg-black/40 text-sm transition-colors"
            title={isCollapsed ? 'Expandir menú' : 'Colapsar menú'}
          >
            {isCollapsed ? '▶' : '◀'}
          </button>
        </div>

        {/* MENÚ DE NAVEGACIÓN */}
        <nav className="flex flex-col gap-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors
                  ${isActive
                    ? 'bg-[#3b1f0d]/90 text-white font-semibold shadow-inner'
                    : 'hover:bg-black/20 text-white/85 hover:text-white'
                  }`}
                title={isCollapsed ? item.name : ''}
              >
                <span className={`icon-cookie-badge flex items-center justify-center w-8 h-8 flex-shrink-0 ${isActive ? 'icon-cookie-badge--active' : ''}`}>
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="w-4 h-4"
                    style={{ filter: isActive ? 'brightness(0)' : 'none' }}
                  />
                </span>
                {!isCollapsed && (
                  <span className="text-sm">{item.name}</span>
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* PARTE INFERIOR: Botón cerrar sesión */}
      <button
        onClick={logout}
        className="cookie-door-btn group flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/80 hover:bg-red-900/80 hover:text-white transition-colors w-full"
      >
        <span className="cookie-door" aria-hidden="true">
          <svg viewBox="0 0 40 40" className="cookie-door-food">
            <circle cx="20" cy="19" r="12" fill="#f0c674" stroke="#c1892f" strokeWidth="1" />
            <path d="M 30 12 Q 34 19 30 27 Q 26 22 30 12 Z" fill="#1c0e05" />
            <circle cx="25" cy="13" r="1.6" fill="#5c3317" />
            <circle cx="15" cy="15" r="1.4" fill="#5c3317" />
            <circle cx="13" cy="24" r="1.6" fill="#5c3317" />
            <circle cx="22" cy="26" r="1.3" fill="#5c3317" />
          </svg>
          <svg viewBox="0 0 40 40" className="cookie-door-panel">
            <rect x="3" y="2" width="25" height="36" rx="7" fill="#b8721e" stroke="#3b1f0d" strokeWidth="2" />
            <circle cx="23" cy="20" r="2.2" fill="#3b1f0d" />
          </svg>
        </span>
        {!isCollapsed && <span className="text-sm">Cerrar sesión</span>}
      </button>

    </div>
  )
}
