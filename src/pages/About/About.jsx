import { Users, BookOpen, Database, BarChart2, Layout, FileText } from 'lucide-react'

const integrantes = [
  {
    nombre: 'Amy',
    rol: 'Líder técnica & Autenticación',
    descripcion: 'Responsable de la configuración del proyecto, autenticación con Supabase, CAPTCHA, despliegue en Netlify y fusión de ramas.',
    icono: <Layout size={22} />,
    rama: 'feature/auth',
    color: '#c17817',
  },
  {
    nombre: 'María',
    rol: 'Barra lateral & Contenido institucional',
    descripcion: 'Responsable de la barra lateral de navegación y las páginas de Quiénes somos, Problemática y Objetivos.',
    icono: <BookOpen size={22} />,
    rama: 'feature/sidebar-contenido',
    color: '#a8571f',
  },
  {
    nombre: 'José',
    rol: 'Diseño visual & Identidad de marca',
    descripcion: 'Responsable de la paleta de colores, tipografía, íconos y coherencia visual en todas las páginas del proyecto.',
    icono: <FileText size={22} />,
    rama: 'feature/diseño-visual',
    color: '#a6791e',
  },
  {
    nombre: 'Diego',
    rol: 'Dashboard principal',
    descripcion: 'Responsable de las tarjetas KPI, gráfico de evolución de rastreo, mapa de calor por país y filtros globales.',
    icono: <BarChart2 size={22} />,
    rama: 'feature/dashboard-principal',
    color: '#6b3410',
  },
  {
    nombre: 'Rudy',
    rol: 'Dashboards analíticos',
    descripcion: 'Responsable de las 11 consultas analíticas (CA1–CA11) con sus gráficos, narrativa e interpretación de resultados.',
    icono: <Database size={22} />,
    rama: 'feature/dashboards-analiticos',
    color: '#9c4a2e',
  },
]

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <Users size={28} className="text-[#ffb05a]" />
          <h1 className="text-2xl font-semibold text-[#fff3d6]" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.35)' }}>
            Quiénes somos
          </h1>
        </div>
        <p className="text-[#e3c9a0] text-base leading-relaxed">
          Somos un equipo de cinco estudiantes del programa de Ingeniería de Sistemas e Informática
          de la Universidad Nacional Santiago Antúnez de Mayolo (UNASAM), Huaraz — Áncash, Perú.
          Este proyecto forma parte del curso de{' '}
          <strong className="text-[#fff3d6]">Big Data y Business Intelligence</strong> (Semestre 2026-I).
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
        {integrantes.map((p) => (
          <div
            key={p.nombre}
            className="rounded-xl p-5 flex gap-4 transition-shadow hover:shadow-md"
            style={{ background: '#fff3d6', border: '1px solid #e6ac5c' }}
          >
            <div className="flex-shrink-0 w-11 h-11 rounded-lg flex items-center justify-center text-white" style={{ background: p.color }}>
              {p.icono}
            </div>
            <div>
              <p className="font-semibold text-sm" style={{ color: '#3b1f0d' }}>{p.nombre}</p>
              <p className="text-xs mb-1 font-semibold" style={{ color: p.color }}>{p.rol}</p>
              <p className="text-xs leading-relaxed" style={{ color: '#6b4f30' }}>{p.descripcion}</p>
              <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded font-mono" style={{ background: '#f0e0bd', color: '#8a6a45' }}>
                {p.rama}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl p-6" style={{ background: 'linear-gradient(155deg, #2b1608 0%, #3b1f0d 100%)', border: '1px solid #5c3317' }}>
        <h2 className="text-base font-semibold mb-2" style={{ color: '#ffd98a' }}>Sobre el proyecto DMCookies</h2>
        <p className="text-sm leading-relaxed" style={{ color: '#e8d3ae' }}>
          DMCookies es un Data Mart analítico construido sobre datos abiertos de{' '}
          <strong style={{ color: '#fff3d6' }}>WhoTracks.Me (Ghostery)</strong> y <strong style={{ color: '#fff3d6' }}>Google Trends</strong>,
          que permite medir la intensidad del rastreo no transparente mediante cookies de terceros
          en 10 países durante el período enero 2021 – marzo 2026. El proyecto se vincula al{' '}
          <strong style={{ color: '#fff3d6' }}>ODS 16 — Paz, Justicia e Instituciones Sólidas</strong> a través de sus metas
          16.6, 16.10 y 16.b.
        </p>
      </div>
    </div>
  )
}
