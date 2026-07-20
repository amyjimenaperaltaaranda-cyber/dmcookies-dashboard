import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const skeleton = 'animate-pulse bg-slate-700 rounded';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800/95 backdrop-blur-md border border-slate-700 p-4 rounded-xl shadow-2xl">
        <p className="text-slate-200 font-bold mb-3 text-sm">{label}</p>
        {payload.map((entry, i) => (
          <div key={i} className="flex items-center gap-3 mb-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
            <p className="text-xs font-medium text-slate-300">
              {entry.name}: <span className="text-white font-semibold">{entry.value}</span>
            </p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function MainLineChart({ tendencias, loading }) {
  const colors = {
    'Cookies Internet': '#34d399',
    'Privacidad Online': '#3b82f6',
    'Datos Personales': '#f59e0b',
  };

  return (
    <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-700/50 h-[420px] flex flex-col">
<<<<<<< HEAD
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">Tendencias Google</h3>
          <p className="text-sm text-slate-400 mt-1">Índices de búsqueda por período</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
=======
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">Tendencias Google</h3>
          <p className="text-sm text-slate-400 mt-1">Índices de búsqueda por período</p>
          <details className="mt-2 group">
            <summary className="text-xs font-semibold text-[#e0973f] cursor-pointer hover:underline outline-none flex items-center gap-1">
              <span>¿Qué significa este gráfico?</span>
              <span className="group-open:rotate-180 transition-transform duration-300 text-[10px]">▼</span>
            </summary>
            <p className="text-[11px] leading-relaxed text-slate-300 mt-2 bg-slate-900/60 p-3 rounded-lg border border-slate-700/50 max-w-md shadow-inner">
              Muestra el índice de interés de búsqueda en el tiempo para los términos "Cookies de Internet", "Privacidad en línea" y "Datos Personales". Valores altos indican un mayor nivel de preocupación o curiosidad pública sobre la privacidad digital.
            </p>
          </details>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-3">
>>>>>>> dashboard
          {Object.entries(colors).map(([name, color]) => (
            <span key={name} className="flex items-center text-xs font-medium text-slate-300">
              <div className="w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: color }}></div>
              {name}
            </span>
          ))}
        </div>
      </div>

      <div className="flex-1 w-full min-h-0">
        {loading ? (
          <div className="w-full h-full flex flex-col justify-end gap-3 pb-4">
            {[80, 65, 75, 55, 90, 70].map((h, i) => (
              <div key={i} className={`${skeleton} w-full`} style={{ height: `${h}%`, opacity: 0.3 }}></div>
            ))}
          </div>
        ) : tendencias.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-slate-500 text-sm">No hay datos para el período seleccionado</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={tendencias} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                {Object.entries(colors).map(([name, color]) => (
<<<<<<< HEAD
                  <linearGradient key={name} id={`grad-${name}`} x1="0" y1="0" x2="0" y2="1">
=======
                  <linearGradient key={name} id={`grad-${name.replace(/\s+/g, '-')}`} x1="0" y1="0" x2="0" y2="1">
>>>>>>> dashboard
                    <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={color} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.5} />
              <XAxis
                dataKey="name"
                stroke="#64748b"
                tick={{ fill: '#94a3b8', fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                dy={10}
                interval="preserveStartEnd"
              />
              <YAxis
                stroke="#64748b"
                tick={{ fill: '#94a3b8', fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                dx={-10}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#475569', strokeWidth: 1, strokeDasharray: '4 4' }} />
              {Object.entries(colors).map(([name, color]) => (
                <Area
                  key={name}
                  type="monotone"
                  dataKey={name}
                  stroke={color}
                  strokeWidth={2.5}
                  fillOpacity={1}
<<<<<<< HEAD
                  fill={`url(#grad-${name})`}
=======
                  fill={`url(#grad-${name.replace(/\s+/g, '-')})`}
>>>>>>> dashboard
                  activeDot={{ r: 5, fill: color, stroke: '#0f172a', strokeWidth: 2 }}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
