// src/components/Layout/Sidebar.jsx
import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  const location = useLocation()
  const logout = useAuthStore((state) => state.logout) // Consumimos tu función de cerrar sesión

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Consultas', path: '/consultas', icon: '🔍' },
    { name: 'Sobre Nosotros', path: '/about', icon: '👥' },
    { name: 'Objetivos', path: '/objectives', icon: '🎯' },
    { name: 'Problemática', path: '/problematica', icon: '⚠️' },
  ]

  return (
    <div className={`h-screen bg-gray-900 text-white fixed left-0 top-0 p-4 flex flex-col justify-between transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      
      {/* PARTE SUPERIOR: Logo y Botón de Colapso */}
      <div>
        <div className="flex items-center justify-between mb-8 px-2 py-2 border-b border-gray-800">
          {!isCollapsed && <span className="font-bold text-lg">DMCookies 🍪</span>}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded bg-gray-800 hover:bg-gray-700 text-sm"
            title={isCollapsed ? "Expandir menú" : "Colapsar menú"}
          >
            {isCollapsed ? '➡️' : '⬅️'}
          </button>
        </div>

        {/* NAVEGACIÓN */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center p-2.5 rounded-lg transition-colors ${
                  isActive ? 'bg-amber-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span className="text-xl mr-3">{item.icon}</span>
                {!isCollapsed && <span className="truncate">{item.name}</span>}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* PARTE INFERIOR: Botón Desplegado de Cerrar Sesión */}
      <div className="border-t border-gray-800 pt-4">
        <button
          onClick={logout}
          className="w-full flex items-center p-2.5 rounded-lg bg-red-950/40 text-red-400 hover:bg-red-900 hover:text-white transition-colors"
        >
          <span className="text-xl mr-3">🚪</span>
          {!isCollapsed && <span>Cerrar Sesión</span>}
        </button>
      </div>

    </div>
  )
}