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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">Mapa de Calor — Rastreo</h3>
          <p className="text-sm text-slate-400 mt-1">Intensidad de rastreo por trimestre y mes</p>
          <details className="mt-2 group">
            <summary className="text-xs font-semibold text-[#e0973f] cursor-pointer hover:underline outline-none flex items-center gap-1">
              <span>¿Qué significa este gráfico?</span>
              <span className="group-open:rotate-180 transition-transform duration-300 text-[10px]">▼</span>
            </summary>
            <p className="text-[11px] leading-relaxed text-slate-300 mt-2 bg-slate-900/60 p-3 rounded-lg border border-slate-700/50 max-w-sm shadow-inner z-50 relative">
              Visualiza la intensidad del seguimiento web a los usuarios. Los colores más intensos (naranjas brillantes) revelan épocas del año con tasas de rastreo más agresivas mediante cookies y scripts de terceros.
            </p>
          </details>
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
        <div className="flex-1 flex flex-col justify-between overflow-x-auto overflow-y-hidden pb-2">
          <div className="min-w-[400px] h-full flex flex-col">
            {/* Header Meses */}
            <div className="flex mb-2 shrink-0">
              <div className="w-10 sm:w-12 shrink-0"></div>
              <div className="flex-1 grid grid-cols-12 gap-1">
                {meses.map(m => (
                  <div key={m} className="notranslate text-center text-[10px] sm:text-[11px] text-slate-500 font-medium tracking-tighter overflow-hidden text-ellipsis" translate="no">{m}</div>
                ))}
              </div>
            </div>

            {/* Filas por trimestre */}
            <div className="flex-1 flex flex-col gap-2">
              {trimestres.map(q => (
                <div key={q} className="flex-1 flex items-center">
                  <div className="notranslate w-10 sm:w-12 text-[10px] sm:text-[11px] text-slate-400 font-bold shrink-0 leading-tight" translate="no">{q}</div>
                  <div className="flex-1 grid grid-cols-12 gap-1 h-full">
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
          </div>
        </div>
      )}
    </div>
  );
}
