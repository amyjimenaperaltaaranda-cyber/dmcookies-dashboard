// src/components/Layout/MainLayout.jsx
import Sidebar from './Sidebar'

export default function MainLayout({ children }) {
  return (
    <div className="flex bg-gray-50 min-h-screen text-gray-800">
      {/* Pintamos la barra lateral fija */}
      <Sidebar />
      
      {/* Contenedor dinámico donde se renderizará el contenido de cada página */}
      <main className="flex-1 pl-64 p-8 animate-fade-in">
        {children}
      </main>
    </div>
  )
}