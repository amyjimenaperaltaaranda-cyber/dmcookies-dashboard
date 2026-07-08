// src/components/Layout/Sidebar.jsx
import { Link, useLocation } from 'react-router-dom'

export default function Sidebar() {
  const location = useLocation()

  // Lista de navegación con las rutas de tu App.jsx
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Consultas', path: '/consultas' },
    { name: 'Sobre Nosotros', path: '/about' },
    { name: 'Objetivos', path: '/objectives' },
    { name: 'Problemática', path: '/problematica' },
  ]

  return (
    <div className="w-64 h-screen bg-gray-900 text-white fixed left-0 top-0 p-4 flex flex-col shadow-xl">
      <div className="mb-8 px-4 py-2 border-b border-gray-800">
        <h2 className="text-xl font-bold tracking-wider text-amber-500">DMCookies 🍪</h2>
      </div>
      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => {
          // Detecta en qué página estás para iluminar el botón activo
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-4 py-2.5 rounded-lg transition-colors ${
                isActive
                  ? 'bg-amber-600 text-white font-medium shadow-md'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}