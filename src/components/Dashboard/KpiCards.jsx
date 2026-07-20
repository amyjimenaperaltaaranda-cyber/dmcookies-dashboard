import React from 'react';
import { Globe, ShieldCheck, TrendingUp, Database } from 'lucide-react';

const skeleton = 'animate-pulse rounded';
const skeletonStyle = { background: 'rgba(59,31,13,0.18)' };

export default function KpiCards({ kpis, loading }) {
  // Paleta "galleta" — misma familia de colores que Problemática (caramelo/canela/miel/chocolate)
  const cards = [
    {
      id: 1,
      title: 'Países Monitoreados',
      value: kpis?.totalPaises,
      subtitle: 'Total de países en BD',
      icon: Globe,
      accent: '#c17817', // caramelo
    },
    {
      id: 2,
      title: 'Países con GDPR',
      value: kpis?.totalGdpr,
      subtitle: 'Regulación activa',
      icon: ShieldCheck,
      accent: '#a8571f', // canela
    },
    {
      id: 3,
      title: 'Índice Cookies Internet',
      value: kpis ? `${kpis.avgCookiesInternet}` : null,
      subtitle: 'Promedio de tendencia',
      icon: TrendingUp,
      accent: '#a6791e', // miel
    },
    {
      id: 4,
      title: 'Uso de Datos Promedio',
      value: kpis ? `${kpis.avgUsoKb} KB` : null,
      subtitle: 'Por sesión rastreada',
      icon: Database,
      accent: '#6b3410', // chocolate
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
      {cards.map((card) => (
        <div
          key={card.id}
          className="kpi-cookie-card relative overflow-hidden rounded-2xl p-6 group"
        >
          <div
            className="absolute -right-10 -top-10 w-32 h-32 rounded-full blur-3xl opacity-40 group-hover:opacity-70 transition-opacity duration-500"
            style={{ background: card.accent }}
          ></div>

          <div className="relative z-10 flex justify-between items-start">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium tracking-wide" style={{ color: '#8a6a45' }}>{card.title}</p>
              {loading ? (
                <div className={`${skeleton} h-9 w-24 mt-2`} style={skeletonStyle}></div>
              ) : (
                <h3 className="text-3xl font-bold mt-2 tracking-tight" style={{ color: '#3b1f0d' }}>{card.value ?? '—'}</h3>
              )}
            </div>
            <div className="p-3 rounded-xl shrink-0" style={{ background: `${card.accent}22` }}>
              <card.icon size={22} style={{ color: card.accent }} />
            </div>
          </div>

          <div className="relative z-10 mt-5">
            <span className="text-xs font-medium" style={{ color: '#a9885f' }}>{card.subtitle}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
