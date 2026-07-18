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
    <div className={`h-screen bg-gray-900 text-white fixed left-0 top-0 p-4 flex flex-col justify-between transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-56'}`}>

      {/* PARTE SUPERIOR: Logo y Botón de Colapso */}
      <div>
        <div className="flex items-center justify-between mb-8 px-2 py-2 border-b border-gray-700">
          {!isCollapsed && (
            <span className="font-bold text-lg">DMCookies 🍪</span>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded bg-gray-800 hover:bg-gray-700 text-sm"
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
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors
                  ${isActive
                    ? 'bg-amber-500 text-white font-semibold'
                    : 'hover:bg-gray-800 text-gray-300 hover:text-white'
                  }`}
                title={isCollapsed ? item.name : ''}
              >
                <img
                  src={item.icon}
                  alt={item.name}
                  className="w-5 h-5 flex-shrink-0"
                  style={{ filter: isActive ? 'brightness(0) invert(1)' : 'none' }}
                />
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
        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-red-900 hover:text-white transition-colors w-full"
      >
        <span className="text-lg">🚪</span>
        {!isCollapsed && <span className="text-sm">Cerrar sesión</span>}
      </button>

    </div>
  )
}