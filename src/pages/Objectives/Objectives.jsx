import { Target, CheckCircle2, Database, BarChart2, TrendingUp, Shield, Map } from 'lucide-react'

const objetivosEspecificos = [
  {
    numero: 'OE1',
    icono: <Database size={18} />,
    titulo: 'Recopilar y estructurar los datos',
    descripcion:
      'Recopilar y estructurar los datos abiertos de WhoTracks.Me (Ghostery) y Google Trends en un Data Mart (DMCookies) con series temporales mensuales desde enero 2021 hasta marzo 2026, para 10 países y 15 trackers.',
    color: 'blue',
  },
  {
    numero: 'OE2',
    icono: <BarChart2 size={18} />,
    titulo: 'Medir la dimensión técnica del rastreo',
    descripcion:
      'Medir la dimensión técnica del rastreo no transparente mediante los indicadores tracked, reach, cookie_samesite_none y site_reach del dataset de WhoTracks.Me, diferenciando los niveles global, latinoamericano, Perú y Áncash.',
    color: 'violet',
  },
  {
    numero: 'OE3',
    icono: <TrendingUp size={18} />,
    titulo: 'Cuantificar la brecha de desinformación',
    descripcion:
      'Cuantificar la brecha de desinformación como la diferencia entre la intensidad técnica del rastreo (WhoTracks.Me) y el índice de búsqueda sobre privacidad del usuario peruano (Google Trends), mes a mes en el período de análisis.',
    color: 'amber',
  },
  {
    numero: 'OE4',
    icono: <TrendingUp size={18} />,
    titulo: 'Proyectar la evolución del rastreo',
    descripcion:
      'Proyectar la evolución del rastreo mediante fingerprinting en Perú hacia el año 2028, aplicando modelos de regresión lineal sobre la serie temporal del dataset, para anticipar el escenario en que el rastreo sin cookies supere al rastreo con cookies.',
    color: 'green',
  },
  {
    numero: 'OE5',
    icono: <Shield size={18} />,
    titulo: 'Comparar el cumplimiento regulatorio',
    descripcion:
      'Comparar el nivel de rastreo tracked entre Perú y países con GDPR (Alemania y España) por trimestre, para evidenciar la brecha regulatoria y su vinculación con la meta 16.6 del ODS 16.',
    color: 'red',
  },
  {
    numero: 'OE6',
    icono: <Map size={18} />,
    titulo: 'Comunicar los hallazgos',
    descripcion:
      'Comunicar los hallazgos a través de dashboards interactivos en Power BI y una plataforma web (DMCookies) que presente la narrativa, los datos, los diagramas de Ishikawa y las 11 consultas analíticas de forma accesible para cualquier usuario.',
    color: 'teal',
  },
]

const colorMap = {
  blue:   { bg: 'bg-blue-50',   border: 'border-blue-200',   icon: 'bg-blue-100 text-blue-600',   num: 'bg-blue-600 text-white'   },
  violet: { bg: 'bg-violet-50', border: 'border-violet-200', icon: 'bg-violet-100 text-violet-600', num: 'bg-violet-600 text-white' },
  amber:  { bg: 'bg-amber-50',  border: 'border-amber-200',  icon: 'bg-amber-100 text-amber-600',  num: 'bg-amber-500 text-white'  },
  green:  { bg: 'bg-green-50',  border: 'border-green-200',  icon: 'bg-green-100 text-green-600',  num: 'bg-green-600 text-white'  },
  red:    { bg: 'bg-red-50',    border: 'border-red-200',    icon: 'bg-red-100 text-red-600',      num: 'bg-red-600 text-white'    },
  teal:   { bg: 'bg-teal-50',   border: 'border-teal-200',   icon: 'bg-teal-100 text-teal-600',    num: 'bg-teal-600 text-white'   },
}

export default function Objetivos() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">

      {/* Encabezado */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <Target size={28} className="text-blue-600" />
          <h1 className="text-2xl font-semibold text-gray-900">Objetivos</h1>
        </div>
        <p className="text-gray-500 text-base leading-relaxed">
          Propósitos que guían el desarrollo del proyecto DMCookies, orientados a medir,
          analizar y comunicar la desinformación sobre cookies en el Perú y su entorno global.
        </p>
      </div>

      {/* Objetivo general */}
      <div className="bg-gray-900 rounded-xl p-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
            <CheckCircle2 size={22} className="text-green-400" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
              Objetivo general
            </p>
            <p className="text-white text-base leading-relaxed">
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
      <h2 className="text-base font-semibold text-gray-700 mb-4">
        Objetivos específicos
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {objetivosEspecificos.map((oe) => {
          const c = colorMap[oe.color]
          return (
            <div
              key={oe.numero}
              className={`${c.bg} ${c.border} border rounded-xl p-5 flex flex-col gap-3`}
            >
              <div className="flex items-center gap-3">
                <span className={`text-xs font-bold px-2 py-1 rounded-lg ${c.num}`}>
                  {oe.numero}
                </span>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${c.icon}`}>
                  {oe.icono}
                </div>
                <p className="font-semibold text-gray-900 text-sm leading-tight flex-1">
                  {oe.titulo}
                </p>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {oe.descripcion}
              </p>
            </div>
          )
        })}
      </div>

      {/* Alineación ODS */}
      <div className="mt-8 border border-gray-200 rounded-xl p-5 bg-white">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
          Alineación con el ODS 16
        </p>
        <div className="flex flex-wrap gap-3">
          {[
            { meta: '16.6', desc: 'Instituciones eficaces, responsables y transparentes', oe: 'OE2, OE5' },
            { meta: '16.10', desc: 'Acceso público a la información y libertades fundamentales', oe: 'OE3, OE6' },
            { meta: '16.b', desc: 'Leyes y políticas no discriminatorias para el desarrollo', oe: 'OE4, OE5' },
          ].map((m) => (
            <div key={m.meta} className="flex-1 min-w-[180px] bg-blue-50 border border-blue-100 rounded-lg p-3">
              <p className="text-blue-700 font-bold text-sm mb-0.5">Meta {m.meta}</p>
              <p className="text-blue-600 text-xs mb-1">{m.desc}</p>
              <p className="text-blue-400 text-xs">Cubre: <strong>{m.oe}</strong></p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}