// src/components/Layout/MainLayout.jsx
import { useState } from 'react'
import Sidebar from './Sidebar'

export default function MainLayout({ children }) {
  // Estado global del diseño para saber si el menú está encogido o no
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen bg-slate-900 text-gray-100">
      {/* Pasamos el estado y la función para cambiarlo al Sidebar */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
      {/* Borde delgado a la izquierda del contenido, entre sidebar y dashboard */}
      <main
        className={`flex-1 transition-all duration-300 ${isCollapsed ? 'pl-20' : 'pl-64'}`}
        style={{ borderLeft: '1px solid rgba(255,255,255,0.12)' }}
      >
        {children}
      </main>
    </div>
  )
}