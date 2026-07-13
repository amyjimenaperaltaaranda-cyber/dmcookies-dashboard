import React, { useMemo } from 'react';

const skeleton = 'animate-pulse bg-slate-700 rounded';

const trimestres = ['Q1', 'Q2', 'Q3', 'Q4'];
const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

function getColorClass(value, max) {
  if (!max || max === 0) return 'bg-orange-500/10 border-orange-500/10';
  const ratio = value / max;
  if (ratio < 0.2) return 'bg-orange-500/10 hover:bg-orange-500/30 border-orange-500/10';
  if (ratio < 0.4) return 'bg-orange-500/30 hover:bg-orange-500/50 border-orange-500/20';
  if (ratio < 0.6) return 'bg-orange-500/50 hover:bg-orange-500/70 border-orange-500/30';
  if (ratio < 0.8) return 'bg-orange-500/70 hover:bg-orange-500/90 border-orange-500/50';
  return 'bg-orange-500 hover:bg-orange-400 border-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.3)]';
}

export default function HeatMap({ heatmapData, loading }) {
  // Calcular valor máximo para normalizar colores
  const maxVal = useMemo(() => {
    if (!heatmapData || heatmapData.length === 0) return 1;
    return Math.max(...heatmapData.map(d => d.value), 1);
  }, [heatmapData]);

  // Construir matriz Q (trimestre) x Mes
  const matrix = useMemo(() => {
    const result = {};
    trimestres.forEach(q => {
      result[q] = {};
      meses.forEach(m => {
        result[q][m] = null;
      });
    });
    heatmapData?.forEach(d => {
      if (result[d.trimestre] !== undefined) {
        result[d.trimestre][d.mes] = d.value;
      }
    });
    return result;
  }, [heatmapData]);

  return (
    <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-700/50 h-[420px] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">Mapa de Calor — Rastreo</h3>
          <p className="text-sm text-slate-400 mt-1">Intensidad de rastreo por trimestre y mes</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
          <span>Menos</span>
          <div className="flex gap-1 mx-1">
            {[10, 30, 50, 70, 100].map(o => (
              <div key={o} className="w-3 h-3 rounded-sm" style={{ backgroundColor: `rgba(249,115,22,${o / 100})` }}></div>
            ))}
          </div>
          <span>Más</span>
        </div>
      </div>

      {loading ? (
        <div className="flex-1 grid grid-rows-4 gap-2">
          {trimestres.map(q => (
            <div key={q} className={`${skeleton} w-full rounded-xl opacity-30`}></div>
          ))}
        </div>
      ) : heatmapData.length === 0 ? (
        <div className="flex items-center justify-center flex-1">
          <p className="text-slate-500 text-sm">No hay datos de seguimiento para el período seleccionado</p>
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-between gap-1 min-h-0 overflow-y-auto">
          {/* Header Meses */}
          <div className="flex mb-1 shrink-0">
            <div className="w-8 shrink-0"></div>
            <div className="flex-1 grid grid-cols-12 gap-0.5">
              {meses.map(m => (
                <div key={m} className="text-center text-[10px] text-slate-500 font-medium">{m}</div>
              ))}
            </div>
          </div>

          {/* Filas por trimestre */}
          {trimestres.map(q => (
            <div key={q} className="flex-1 flex items-center min-h-0">
              <div className="w-8 text-[11px] text-slate-400 font-bold shrink-0">{q}</div>
              <div className="flex-1 grid grid-cols-12 gap-0.5 h-full">
                {meses.map(m => {
                  const val = matrix[q][m];
                  return (
                    <div
                      key={`${q}-${m}`}
                      className={`rounded border transition-all duration-200 cursor-pointer group relative ${val !== null ? getColorClass(val, maxVal) : 'bg-slate-800/30 border-slate-700/20'}`}
                    >
                      {val !== null && (
                        <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-900 border border-slate-700 text-white text-xs font-medium py-1 px-2 rounded-md pointer-events-none whitespace-nowrap z-10 transition-opacity shadow-xl">
                          {q} - {m}: <span className="text-orange-400">{val.toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
