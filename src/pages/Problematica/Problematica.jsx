import { AlertTriangle, Globe, MapPin, Flag, Mountain, ChevronRight } from 'lucide-react'

const niveles = [
  {
    icono: <Globe size={20} />,
    titulo: 'Nivel internacional',
    color: 'caramelo',
    contenido: `El rastreo mediante cookies de terceros constituye hoy uno de los mecanismos más extendidos de recopilación no transparente de datos en la web a escala global, para lo cual se evidencia que el 32,1% de los trackers activos mundialmente emplea cookies como tecnología principal de seguimiento y que hasta el 90% de los sitios web gubernamentales incorporan cookies de rastreadores de terceros sin el consentimiento real de los usuarios, incluso en naciones que cuentan con leyes estrictas de privacidad (Ghostery, 2026; IMDEA Networks, 2022), posteriormente constatando que los trackers de Google Analytics y Google AdSense aumentaron su presencia en la mayoría de regiones entre 2021 y 2024, consolidando una estructura oligopólica de rastreo que opera de forma diferenciada según la ubicación geográfica del usuario (Kaspersky, 2024), finalmente demostrando que los usuarios fuera de jurisdicciones con marcos equivalentes al GDPR europeo son sistemáticamente los más expuestos al rastreo no informado, en directa vulneración de la meta 16.6 del ODS 16 (Naciones Unidas, 2030).`,
    fuentes: ['Ghostery, 2026', 'IMDEA Networks, 2022', 'Kaspersky, 2024'],
  },
  {
    icono: <MapPin size={20} />,
    titulo: 'Nivel latinoamericano',
    color: 'canela',
    contenido: `En América Latina, la desinformación sobre el uso de cookies de terceros se profundiza por la convergencia de una expansión acelerada de la conectividad digital y un marco regulatorio fragmentado e insuficiente en materia de privacidad, para lo cual se precisa que 418 millones de individuos en la región accedieron a internet móvil en 2023 y que las filtraciones de datos de gran repercusión han amplificado el interés público llevando a los usuarios a exigir mayor transparencia en la recopilación y almacenamiento de sus datos (IMARC Group, 2023), sin embargo esta demanda ciudadana no ha sido acompañada por una respuesta institucional uniforme, ya que la protección de datos personales y la privacidad en línea continúan siendo una agenda inconclusa en la región (Access Now, 2025), finalmente estableciendo que existe una conexión intrínseca entre la capacidad de recolectar datos personales facilitada por cookies de terceros y la forma en que se genera y divulga desinformación en redes sociales e internet en general.`,
    fuentes: ['IMARC Group, 2023', 'Access Now, 2025'],
  },
  {
    icono: <Flag size={20} />,
    titulo: 'Nivel Perú',
    color: 'miel',
    contenido: `En el Perú, la desinformación sobre cookies opera dentro de un vacío normativo que durante el período 2021–2024 careció de regulación explícita sobre mecanismos de rastreo web, situación que afecta de manera directa el cumplimiento de la meta 16.6 del ODS 16, para lo cual se precisa que las cookies configuran un tema relevante en materia de protección de datos personales que atañe tanto a usuarios en el tema de derechos como a las entidades titulares de los sitios web a nivel de obligaciones (El Peruano, 2023), posteriormente introduciéndose recién a través del Decreto Supremo N° 016-2024-JUS, vigente desde el 31 de marzo de 2025, una normativa que adecúa el sistema de protección de datos al uso de tecnologías digitales estableciendo multas entre 50 UIT y 100 UIT (EY Perú, 2025), finalmente significando que durante todo el período de análisis el ciudadano peruano navegó sin un marco sancionador efectivo que garantizara la transparencia institucional exigida por el ODS 16.`,
    fuentes: ['El Peruano, 2023', 'EY Perú, 2025'],
  },
  {
    icono: <Mountain size={20} />,
    titulo: 'Nivel Áncash',
    color: 'chocolate',
    contenido: `En la región Áncash, la desinformación sobre cookies adquiere su dimensión más crítica al combinarse con las brechas persistentes de alfabetización digital que caracterizan a las zonas de sierra en el Perú, debilitando el ejercicio efectivo del derecho a la información consagrado en la meta 16.10 del ODS 16, para lo cual se evidencia que en el segundo trimestre de 2023 el 77,3% de la población del país de seis años a más usó internet, registrándose una diferencia estructural entre Lima Metropolitana donde el acceso alcanzó el 89,2% y el área rural donde se situó en el 51,2%, siendo la sierra donde se ubica Áncash la región con mayor rezago en conectividad y capacidades digitales (INEI, 2023), a ello se suma que investigaciones evidencian obstáculos de infraestructura deficiente, altos costos y falta de alfabetización digital (Producción Científica LUZ, 2025), finalmente implicando que los usuarios ancashinos acceden mayoritariamente desde dispositivos móviles sin extensiones de privacidad, en un entorno institucional local sin capacidad técnica para auditar políticas de cookies.`,
    fuentes: ['INEI, 2023', 'Producción Científica LUZ, 2025'],
  },
]

// Paleta "galleta": una sola tarjeta crema para todas, diferenciada por un acento cálido por nivel
const colorMap = {
  caramelo:  { icon: '#c17817' },
  canela:    { icon: '#a8571f' },
  miel:      { icon: '#a6791e' },
  chocolate: { icon: '#6b3410' },
}

export default function Problematica() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">

      {/* Encabezado */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <AlertTriangle size={28} className="text-[#ffb05a]" />
          <h1 className="text-2xl font-semibold text-[#fff3d6]" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.35)' }}>
            Problemática
          </h1>
        </div>
        <p className="text-[#e3c9a0] text-base leading-relaxed">
          Contexto y justificación del proyecto DMCookies, estructurado mediante método deductivo
          en cuatro niveles geográficos: de lo global a lo particular.
        </p>
      </div>

      {/* Variable problema */}
      <div className="rounded-xl p-6 mb-8" style={{ background: 'linear-gradient(155deg, #2b1608 0%, #3b1f0d 100%)', border: '1px solid #5c3317' }}>
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#c9a479' }}>Variable problema</p>
        <p className="text-[#fff3d6] text-base font-semibold leading-relaxed mb-3">
          Intensidad del rastreo no transparente mediante cookies de terceros
        </p>
        <p className="text-sm leading-relaxed mb-4" style={{ color: '#d9c3a3' }}>
          Definida como el grado en que los sitios web instalan cookies con capacidad de transmisión
          de identificadores de usuario sin que dicho usuario comprenda realmente lo que acepta.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {['tracked', 'reach', 'cookie_samesite_none', 'site_reach'].map((ind) => (
            <div key={ind} className="rounded-lg px-3 py-2 text-center" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(230,172,92,0.25)' }}>
              <p className="text-xs font-mono" style={{ color: '#ffb05a' }}>{ind}</p>
              <p className="text-xs mt-0.5" style={{ color: '#a9885f' }}>indicador</p>
            </div>
          ))}
        </div>
      </div>

      {/* ODS 16 */}
      <div className="rounded-xl p-5 mb-8 flex gap-4 items-start" style={{ background: '#fff3d6', border: '1px solid #e6ac5c' }}>
        <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ background: '#c17817' }}>
          16
        </div>
        <div>
          <p className="font-semibold text-sm mb-1" style={{ color: '#3b1f0d' }}>ODS 16 — Paz, Justicia e Instituciones Sólidas</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {[
              { meta: '16.6', desc: 'Instituciones transparentes y responsables' },
              { meta: '16.10', desc: 'Acceso público a la información' },
              { meta: '16.b', desc: 'Leyes no discriminatorias' },
            ].map((m) => (
              <span key={m.meta} className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg" style={{ background: '#fffaf0', border: '1px solid #e6ac5c', color: '#8a520d' }}>
                <strong>Meta {m.meta}:</strong> {m.desc}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Método deductivo por niveles */}
      <h2 className="text-base font-semibold mb-4 flex items-center gap-2" style={{ color: '#f0dcb8' }}>
        <ChevronRight size={18} style={{ color: '#c9a479' }} />
        Método deductivo — de lo general a lo particular
      </h2>

      <div className="space-y-5">
        {niveles.map((n, i) => {
          const c = colorMap[n.color]
          return (
            <div
              key={i}
              className="rounded-xl p-5"
              style={{ background: '#fff3d6', border: '1px solid #e6ac5c', borderLeft: `4px solid ${c.icon}` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-white" style={{ background: c.icon }}>
                  {n.icono}
                </div>
                <h3 className="font-semibold text-sm" style={{ color: '#3b1f0d' }}>{n.titulo}</h3>
              </div>
              <p className="text-sm leading-relaxed mb-3" style={{ color: '#5c4327' }}>
                {n.contenido}
              </p>
              <div className="flex flex-wrap gap-2">
                {n.fuentes.map((f) => (
                  <span key={f} className="text-xs px-2 py-0.5 rounded font-medium text-white" style={{ background: c.icon }}>
                    {f}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Nota pie */}
      <div className="mt-8 text-xs leading-relaxed pt-5" style={{ color: '#c9a479', borderTop: '1px solid rgba(230,172,92,0.2)' }}>
        <strong style={{ color: '#e3c9a0' }}>Fuentes completas:</strong>{' '}
        Ghostery (2026) · IMDEA Networks (2022) · Kaspersky (2024) · IMARC Group (2023) ·
        Access Now (2025) · El Peruano (2023) · EY Perú (2025) · INEI (2023) ·
        Producción Científica LUZ (2025) · Naciones Unidas, Agenda 2030.
      </div>

    </div>
  )
}
