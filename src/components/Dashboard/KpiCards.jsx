import React from 'react';
import { Globe, ShieldCheck, TrendingUp, Database } from 'lucide-react';

const skeleton = 'animate-pulse bg-slate-700 rounded';

export default function KpiCards({ kpis, loading }) {
  const cards = [
    {
      id: 1,
      title: 'Países Monitoreados',
      value: kpis?.totalPaises,
      subtitle: 'Total de países en BD',
      icon: Globe,
      color: 'text-blue-400',
      bg: 'bg-blue-400/10',
      border: 'border-blue-500/20',
    },
    {
      id: 2,
      title: 'Países con GDPR',
      value: kpis?.totalGdpr,
      subtitle: 'Regulación activa',
      icon: ShieldCheck,
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10',
      border: 'border-emerald-500/20',
    },
    {
      id: 3,
      title: 'Índice Cookies Internet',
      value: kpis ? `${kpis.avgCookiesInternet}` : null,
      subtitle: 'Promedio de tendencia',
      icon: TrendingUp,
      color: 'text-violet-400',
      bg: 'bg-violet-400/10',
      border: 'border-violet-500/20',
    },
    {
      id: 4,
      title: 'Uso de Datos Promedio',
      value: kpis ? `${kpis.avgUsoKb} KB` : null,
      subtitle: 'Por sesión rastreada',
      icon: Database,
      color: 'text-orange-400',
      bg: 'bg-orange-400/10',
      border: 'border-orange-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
      {cards.map((card) => (
        <div
          key={card.id}
          className={`relative overflow-hidden bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 shadow-sm border ${card.border} hover:bg-slate-800/60 transition-all duration-300 group`}
        >
          <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full ${card.bg} blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-500`}></div>

          <div className="relative z-10 flex justify-between items-start">
            <div className="flex-1 min-w-0">
              <p className="text-slate-400 text-sm font-medium tracking-wide">{card.title}</p>
              {loading ? (
                <div className={`${skeleton} h-9 w-24 mt-2`}></div>
              ) : (
                <h3 className="text-3xl font-bold text-white mt-2 tracking-tight">{card.value ?? '—'}</h3>
              )}
            </div>
            <div className={`p-3 rounded-xl ${card.bg} shrink-0`}>
              <card.icon size={22} className={card.color} />
            </div>
          </div>

          <div className="relative z-10 mt-5">
            <span className="text-slate-500 text-xs font-medium">{card.subtitle}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
