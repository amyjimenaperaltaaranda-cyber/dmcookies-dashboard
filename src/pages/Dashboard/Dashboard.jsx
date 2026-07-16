import React, { useState } from 'react';
import DashboardFilters from '../../components/Dashboard/DashboardFilters';
import KpiCards from '../../components/Dashboard/KpiCards';
import MainLineChart from '../../components/Dashboard/MainLineChart';
import HeatMap from '../../components/Dashboard/HeatMap';
import WorldMap from '../../components/Dashboard/WorldMap';
import { useDashboardData } from '../../hooks/useDashboardData';

export default function Dashboard() {
  const [filters, setFilters] = useState({ anio: '', region: '' });
  const { kpis, tendencias, heatmapData, mapData, loading, error } = useDashboardData(filters);

  return (
    <div className="p-4 sm:p-6 lg:p-8 h-full overflow-y-auto bg-slate-900 text-slate-50 w-full min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Título arriba a la izquierda */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 tracking-tight">
              Panel de Control
            </h1>
            <p className="text-slate-400 mt-1 font-medium">Análisis de privacidad y rastreo de cookies.</p>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-400 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700/50">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            {loading ? 'Cargando datos...' : 'Datos en tiempo real'}
          </div>
        </header>

        {/* Error global */}
        {error && (
          <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 text-rose-400 text-sm">
            ⚠️ Error al cargar datos: {error}
          </div>
        )}

        {/* Totales arriba (KPIs) */}
        <KpiCards kpis={kpis} loading={loading} />

        {/* Filtros izquierda + Gráficos apilados derecha */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* Sidebar de filtros */}
          <aside className="w-full lg:w-64 xl:w-56 shrink-0 lg:sticky lg:top-6">
            <DashboardFilters filters={filters} onChange={setFilters} />
          </aside>

          {/* Gráficos apilados verticalmente */}
          <main className="flex-1 flex flex-col gap-8">
            <MainLineChart tendencias={tendencias} loading={loading} />
            <HeatMap heatmapData={heatmapData} loading={loading} />
          </main>

        </div>

        {/* Mapa mundial de países monitoreados */}
        <WorldMap mapData={mapData} loading={loading} />

      </div>
    </div>
  );
}