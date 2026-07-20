// src/components/Layout/Sidebar.jsx
import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

import iconProblematica from '../../assets/logos/problematica.svg'
import iconObjetivo     from '../../assets/logos/objetivo.svg'
import iconConsultas    from '../../assets/logos/Consultas.svg'
import iconDashboard    from '../../assets/logos/Dashboard.svg'
import iconAbout        from '../../assets/logos/About.svg'

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  const location = useLocation()
  const logout = useAuthStore((state) => state.logout)

  const menuItems = [
    { name: 'Problemática',   path: '/problematica', icon: iconProblematica },
    { name: 'Objetivos',      path: '/objectives',   icon: iconObjetivo     },
    { name: 'Consultas',      path: '/consultas',    icon: iconConsultas    },
    { name: 'Dashboard',      path: '/dashboard',    icon: iconDashboard    },
    { name: 'Sobre Nosotros', path: '/about',        icon: iconAbout        },
  ]

  return (
    <div className={`sidebar-cookie relative z-50 h-screen text-white fixed left-0 top-0 p-4 flex flex-col justify-between transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-56'}`}>

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
        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/80 hover:bg-red-900/80 hover:text-white transition-colors w-full"
      >
        <span className="text-lg">🚪</span>
        {!isCollapsed && <span className="text-sm">Cerrar sesión</span>}
      </button>

    </div>
  )
}
