import { Target, CheckCircle2, Database, BarChart2, TrendingUp, Shield, Map } from 'lucide-react'

const objetivosEspecificos = [
  {
    numero: 'OE1',
    icono: <Database size={18} />,
    titulo: 'Recopilar y estructurar los datos',
    descripcion:
      'Recopilar y estructurar los datos abiertos de WhoTracks.Me (Ghostery) y Google Trends en un Data Mart (DMCookies) con series temporales mensuales desde enero 2021 hasta marzo 2026, para 10 países y 15 trackers.',
    color: 'caramelo',
  },
  {
    numero: 'OE2',
    icono: <BarChart2 size={18} />,
    titulo: 'Medir la dimensión técnica del rastreo',
    descripcion:
      'Medir la dimensión técnica del rastreo no transparente mediante los indicadores tracked, reach, cookie_samesite_none y site_reach del dataset de WhoTracks.Me, diferenciando los niveles global, latinoamericano, Perú y Áncash.',
    color: 'canela',
  },
  {
    numero: 'OE3',
    icono: <TrendingUp size={18} />,
    titulo: 'Cuantificar la brecha de desinformación',
    descripcion:
      'Cuantificar la brecha de desinformación como la diferencia entre la intensidad técnica del rastreo (WhoTracks.Me) y el índice de búsqueda sobre privacidad del usuario peruano (Google Trends), mes a mes en el período de análisis.',
    color: 'miel',
  },
  {
    numero: 'OE4',
    icono: <TrendingUp size={18} />,
    titulo: 'Proyectar la evolución del rastreo',
    descripcion:
      'Proyectar la evolución del rastreo mediante fingerprinting en Perú hacia el año 2028, aplicando modelos de regresión lineal sobre la serie temporal del dataset, para anticipar el escenario en que el rastreo sin cookies supere al rastreo con cookies.',
    color: 'chocolate',
  },
  {
    numero: 'OE5',
    icono: <Shield size={18} />,
    titulo: 'Comparar el cumplimiento regulatorio',
    descripcion:
      'Comparar el nivel de rastreo tracked entre Perú y países con GDPR (Alemania y España) por trimestre, para evidenciar la brecha regulatoria y su vinculación con la meta 16.6 del ODS 16.',
    color: 'mostaza',
  },
  {
    numero: 'OE6',
    icono: <Map size={18} />,
    titulo: 'Comunicar los hallazgos',
    descripcion:
      'Comunicar los hallazgos a través de dashboards interactivos en Power BI y una plataforma web (DMCookies) que presente la narrativa, los datos, los diagramas de Ishikawa y las 11 consultas analíticas de forma accesible para cualquier usuario.',
    color: 'terracota',
  },
]

// Paleta "galleta": tarjeta crema uniforme, acento cálido distinto por objetivo
const colorMap = {
  caramelo:  { icon: '#c17817' },
  canela:    { icon: '#a8571f' },
  miel:      { icon: '#a6791e' },
  chocolate: { icon: '#6b3410' },
  mostaza:   { icon: '#b9852a' },
  terracota: { icon: '#9c4a2e' },
}

export default function Objetivos() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">

      {/* Encabezado */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <Target size={28} className="text-[#ffb05a]" />
          <h1 className="text-2xl font-semibold text-[#fff3d6]" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.35)' }}>
            Objetivos
          </h1>
        </div>
        <p className="text-[#e3c9a0] text-base leading-relaxed">
          Propósitos que guían el desarrollo del proyecto DMCookies, orientados a medir,
          analizar y comunicar la desinformación sobre cookies en el Perú y su entorno global.
        </p>
      </div>

      {/* Objetivo general */}
      <div className="rounded-xl p-6 mb-8" style={{ background: 'linear-gradient(155deg, #2b1608 0%, #3b1f0d 100%)', border: '1px solid #5c3317' }}>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <CheckCircle2 size={22} style={{ color: '#7ee0b8' }} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#c9a479' }}>
              Objetivo general
            </p>
            <p className="text-[#fff3d6] text-base leading-relaxed">
              Analizar la intensidad del rastreo no transparente mediante cookies de terceros y su
              relación con la desinformación del usuario e instituciones en el Perú, mediante el
              procesamiento de datos abiertos de WhoTracks.Me y Google Trends en el período
              enero 2021 – marzo 2026, a través de un Data Mart y dashboards de Business Intelligence,
              contribuyendo al cumplimiento de las metas 16.6, 16.10 y 16.b del ODS 16
              de las Naciones Unidas.
            </p>
          </div>
        </div>
      </div>

      {/* Objetivos específicos */}
      <h2 className="text-base font-semibold mb-4" style={{ color: '#f0dcb8' }}>
        Objetivos específicos
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {objetivosEspecificos.map((oe) => {
          const c = colorMap[oe.color]
          return (
            <div
              key={oe.numero}
              className="rounded-xl p-5 flex flex-col gap-3"
              style={{ background: '#fff3d6', border: '1px solid #e6ac5c', borderLeft: `4px solid ${c.icon}` }}
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold px-2 py-1 rounded-lg text-white" style={{ background: c.icon }}>
                  {oe.numero}
                </span>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{ background: c.icon, opacity: 0.85 }}>
                  {oe.icono}
                </div>
                <p className="font-semibold text-sm leading-tight flex-1" style={{ color: '#3b1f0d' }}>
                  {oe.titulo}
                </p>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#6b4f30' }}>
                {oe.descripcion}
              </p>
            </div>
          )
        })}
      </div>

      {/* Alineación ODS */}
      <div className="mt-8 rounded-xl p-5" style={{ background: '#fff3d6', border: '1px solid #e6ac5c' }}>
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#a9885f' }}>
          Alineación con el ODS 16
        </p>
        <div className="flex flex-wrap gap-3">
          {[
            { meta: '16.6', desc: 'Instituciones eficaces, responsables y transparentes', oe: 'OE2, OE5' },
            { meta: '16.10', desc: 'Acceso público a la información y libertades fundamentales', oe: 'OE3, OE6' },
            { meta: '16.b', desc: 'Leyes y políticas no discriminatorias para el desarrollo', oe: 'OE4, OE5' },
          ].map((m) => (
            <div key={m.meta} className="flex-1 min-w-[180px] rounded-lg p-3" style={{ background: '#fffaf0', border: '1px solid #e6ac5c' }}>
              <p className="font-bold text-sm mb-0.5" style={{ color: '#8a520d' }}>Meta {m.meta}</p>
              <p className="text-xs mb-1" style={{ color: '#6b4f30' }}>{m.desc}</p>
              <p className="text-xs" style={{ color: '#a9885f' }}>Cubre: <strong>{m.oe}</strong></p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
