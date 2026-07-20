import { BookOpen } from 'lucide-react'

// Paleta "galleta" reutilizada del resto del proyecto (Problemática / Dashboard)
const ACCENTS = ['#c17817', '#a8571f', '#a6791e', '#6b3410'] // caramelo, canela, miel, chocolate

const terminos = [
  {
    termino: 'Month',
    definicion: 'Este campo representa el período mensual de medición, funciona como la referencia temporal principal de toda la base de datos, ya que cada registro se organiza según el mes correspondiente. El formato YYYY-MM permite ordenar fácilmente las observaciones en series de tiempo y analizar cambios entre 2021 y 2026; además, en la investigación, sirve como eje temporal para modelos y análisis de tendencias relacionadas con el uso de cookies y rastreadores.',
  },
  {
    termino: 'Year',
    definicion: 'Esta variable toma el año como número entero calculándolo automáticamente a partir del campo principal fecha y sirve específicamente para organizar y filtrar los datos por año en los reportes.',
  },
  {
    termino: 'Quarter',
    definicion: 'Significa trimestre del año, se usa para agrupar los meses en bloques de tres meses y así analizar tendencias estacionales o comparar períodos de forma más sencilla como, por ejemplo: Enero -> Q1, mayo -> Q2, etc.',
  },
  {
    termino: 'Country Code',
    definicion: 'Se utiliza para especificar el país de origen de los datos, esto usando códigos estandarizados con dos letras mayúsculas, ejemplos: PE (Perú), BR (Brasil), MX (México), CO (Colombia), CL (Chile), etc.',
  },
  {
    termino: 'Country',
    definicion: 'Nos facilita el nombre del país en el cual se asocian el origen de los datos, siendo el tipo de dato texto y una variable de etiqueta geográfica, osea, es la representación de su ubicación y además está pensada para hispanohablantes.',
  },
  {
    termino: 'Tracker',
    definicion: 'Es el nombre asignado al rastreador web, el cual es un servicio, dominio o script de terceros que se integra en una página web para recopilar información sobre la actividad de los usuarios; como por ejemplo google_analytics, que recopila estadísticas sobre visitantes y comportamiento de navegación.',
  },
  {
    termino: 'Category',
    definicion: 'El campo category clasifica el propósito del rastreador según la categorización de Ghostery TrackerDB. Cada valor indica para qué fue diseñado el tracker; por ejemplo, advertising se relaciona con publicidad comportamental, analytics con medición y análisis de tráfico, y social_media con integraciones de redes sociales; esta variable ayuda a segmentar los rastreadores según su función y permite comparar cuáles categorías tienen mayor presencia o impacto en la privacidad digital.',
  },
  {
    termino: 'Reach',
    definicion: 'Mide mediante un porcentaje en decimal en proporción a las páginas web qué tan popular o invasivo es un rastreador en internet, dado por el total de veces que el usuario o el tráfico de internet encontró a este rastreador.',
  },
  {
    termino: 'Site_reach',
    definicion: 'Mide mediante un porcentaje en decimal en proporción a las páginas web la diversidad de dominios en que se encuentra este tracker, para saber si los datos del tracker vienen de unos pocos sitios web concentrados o si representan el comportamiento de los usuarios a lo largo de muchas páginas web diferentes; por eso, esta variable es complemento de la variable "reach".',
  },
  {
    termino: 'Tracked',
    definicion: 'Mide, en formato de decimales, el porcentaje real de páginas en las que un tracker envía el identificador único del usuario (otorgado por la misma cookie) a los servidores que administran las empresas de esas respectivas cookies sin el conocimiento del usuario; por ejemplo, si tenemos el tracker "twitter_pixel" con tracked de 0,3355, esto quiere decir que de cada 100 páginas revisadas de esa ubicación, el tracker se cargó exitosamente el 33,55% de las veces, enviando el identificador único del usuario hacia los servidores de esa empresa (en este caso, Twitter); en las páginas restantes, no se logró una transmisión exitosa de estas cookies.',
  },
  {
    termino: 'cookie_samesite_none',
    definicion: 'Este campo mide la proporción en decimales de páginas donde el tracker emplea cookies con configuración SameSite=None; a diferencia de SameSite=Strict (entorno estrictamente local) o SameSite=Lax (entorno protegido donde el usuario decide si sus datos viajan o no), SameSite=None indica que la cookie puede enviarse entre distintos sitios web, lo que facilita el rastreo cruzado; mientras más alto sea el número, mayor es la presencia de mecanismos de seguimiento entre páginas externas, por eso esta variable se relaciona directamente con preocupaciones sobre privacidad y regulación digital, especialmente con el ODS 16.10 sobre acceso a la información y transparencia.',
  },
  {
    termino: 'Fingerprinting',
    definicion: 'Representado mediante un porcentaje en decimal en proporción a las páginas web, mide la utilización de técnicas avanzadas de seguimiento realizadas por las empresas que desean identificar a los usuarios mediante la extracción y análisis de las características y configuraciones únicas del navegador o equipo del usuario, operando de manera independiente a las cookies tradicionales.',
  },
  {
    termino: 'requests_per_page',
    definicion: 'También llamada métrica que indica el número promedio de peticiones HTTP por página generadas por un tracker durante la carga de una página web; por ejemplo, google_analytics con un requests_per_page de 2.50 se refiere a que envía varias solicitudes para registrar eventos y estadísticas, saturando parte de la conexión del usuario.',
  },
  {
    termino: 'data_usage_kb',
    definicion: 'Es el indicador de volumen de los datos transferidos por el tracker respectivo; ya que cada carga de página en la que participa incluirá a la cookie, los fragmentos de código para su ejecución lógica (enviar, recolectar información, etc.) y la respuesta del servidor a ese intercambio de información, lo que a su vez puede llegar a afectar el rendimiento de la carga de página, pues estas operaciones se realizan mientras el usuario visita la página.',
  },
]

// Ícono decorativo: galleta con una pequeña lupa, para el inicio de cada definición
function CookieSearchIcon({ color = '#8a520d' }) {
  return (
    <svg width="20" height="20" viewBox="0 0 40 40" className="flex-shrink-0 mt-0.5" aria-hidden="true">
      <circle cx="17" cy="18" r="13" fill="#fff3d6" stroke={color} strokeWidth="2" />
      <circle cx="12" cy="13" r="1.4" fill={color} />
      <circle cx="21" cy="12" r="1.2" fill={color} />
      <circle cx="22" cy="21" r="1.4" fill={color} />
      <circle cx="13" cy="22" r="1.1" fill={color} />
      <circle cx="17" cy="17" r="1" fill={color} />
      <circle cx="27" cy="27" r="6" fill="none" stroke={color} strokeWidth="2.4" />
      <line x1="31.2" y1="31.2" x2="37" y2="37" stroke={color} strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  )
}

export default function DataDictionary() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">

      {/* Encabezado */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <BookOpen size={28} className="text-[#ffb05a]" />
          <h1
            className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-500 tracking-tight"
          >
            Diccionario de Datos
          </h1>
        </div>
        <p className="text-[#e3c9a0] text-base leading-relaxed">
          Definición de cada campo utilizado en la base de datos del proyecto DMCookies.
        </p>
      </div>

      {/* Tarjetas de términos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {terminos.map((t, i) => {
          const accent = ACCENTS[i % ACCENTS.length]
          return (
            <div
              key={t.termino}
              className="dict-term-card rounded-xl p-5"
              style={{ borderLeft: `4px solid ${accent}` }}
            >
              <h3 className="font-bold text-sm mb-2" style={{ color: '#3b1f0d' }}>
                {t.termino}
              </h3>
              <div className="flex items-start gap-2">
                <CookieSearchIcon color={accent} />
                <p className="text-sm leading-relaxed" style={{ color: '#5c4327' }}>
                  {t.definicion}
                </p>
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}
