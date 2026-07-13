import { Users, BookOpen, Database, BarChart2, Layout, FileText } from 'lucide-react'

const integrantes = [
  {
    nombre: 'Amy',
    rol: 'Líder técnica & Autenticación',
    descripcion: 'Responsable de la configuración del proyecto, autenticación con Supabase, CAPTCHA, despliegue en Netlify y fusión de ramas.',
    icono: <Layout size={22} />,
    rama: 'feature/auth',
  },
  {
    nombre: 'María',
    rol: 'Barra lateral & Contenido institucional',
    descripcion: 'Responsable de la barra lateral de navegación y las páginas de Quiénes somos, Problemática y Objetivos.',
    icono: <BookOpen size={22} />,
    rama: 'feature/sidebar-contenido',
  },
  {
    nombre: 'José',
    rol: 'Diseño visual & Identidad de marca',
    descripcion: 'Responsable de la paleta de colores, tipografía, íconos y coherencia visual en todas las páginas del proyecto.',
    icono: <FileText size={22} />,
    rama: 'feature/diseño-visual',
  },
  {
    nombre: 'Diego',
    rol: 'Dashboard principal',
    descripcion: 'Responsable de las tarjetas KPI, gráfico de evolución de rastreo, mapa de calor por país y filtros globales.',
    icono: <BarChart2 size={22} />,
    rama: 'feature/dashboard-principal',
  },
  {
    nombre: 'Rudy',
    rol: 'Dashboards analíticos',
    descripcion: 'Responsable de las 11 consultas analíticas (CA1–CA11) con sus gráficos, narrativa e interpretación de resultados.',
    icono: <Database size={22} />,
    rama: 'feature/dashboards-analiticos',
  },
]

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <Users size={28} className="text-blue-600" />
          <h1 className="text-2xl font-semibold text-gray-900">Quiénes somos</h1>
        </div>
        <p className="text-gray-500 text-base leading-relaxed">
          Somos un equipo de cinco estudiantes del programa de Ingeniería de Sistemas e Informática
          de la Universidad Nacional Santiago Antúnez de Mayolo (UNASAM), Huaraz — Áncash, Perú.
          Este proyecto forma parte del curso de{' '}
          <strong className="text-gray-700">Big Data y Business Intelligence</strong> (Semestre 2026-I).
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
        {integrantes.map((p) => (
          <div
            key={p.nombre}
            className="bg-white border border-gray-200 rounded-xl p-5 flex gap-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              {p.icono}
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">{p.nombre}</p>
              <p className="text-blue-600 text-xs mb-1">{p.rol}</p>
              <p className="text-gray-500 text-xs leading-relaxed">{p.descripcion}</p>
              <span className="inline-block mt-2 text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded font-mono">
                {p.rama}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
        <h2 className="text-base font-semibold text-blue-900 mb-2">Sobre el proyecto DMCookies</h2>
        <p className="text-blue-800 text-sm leading-relaxed">
          DMCookies es un Data Mart analítico construido sobre datos abiertos de{' '}
          <strong>WhoTracks.Me (Ghostery)</strong> y <strong>Google Trends</strong>,
          que permite medir la intensidad del rastreo no transparente mediante cookies de terceros
          en 10 países durante el período enero 2021 – marzo 2026. El proyecto se vincula al{' '}
          <strong>ODS 16 — Paz, Justicia e Instituciones Sólidas</strong> a través de sus metas
          16.6, 16.10 y 16.b.
        </p>
      </div>
    </div>
  )
}