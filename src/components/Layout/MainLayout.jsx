// src/components/Layout/MainLayout.jsx
import { useState } from 'react'
import Sidebar from './Sidebar'

export default function MainLayout({ children }) {
  // Estado global del diseño para saber si el menú está encogido o no
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      {/* Pasamos el estado y la función para cambiarlo al Sidebar */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
      {/* Ajusta dinámicamente el margen izquierdo según el estado del menú */}
      <main className={`flex-1 p-8 transition-all duration-300 ${isCollapsed ? 'pl-20' : 'pl-64'}`}>
        {children}
      </main>
    </div>
  )
}