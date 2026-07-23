import React, { useState } from 'react';
import { LayoutDashboard, Globe, Cookie } from 'lucide-react';
import DashboardFilters from '../../components/Dashboard/DashboardFilters';
import KpiCards from '../../components/Dashboard/KpiCards';
import MainLineChart from '../../components/Dashboard/MainLineChart';
import HeatMap from '../../components/Dashboard/HeatMap';
import WorldMap from '../../components/Dashboard/WorldMap';
import { useDashboardData } from '../../hooks/useDashboardData';

export default function Dashboard() {
  const [filters, setFilters] = useState({ anio: '', region: '' });
  const [activeTab, setActiveTab] = useState('graficos'); // 'graficos' | 'mapa'
  const { kpis, tendencias, heatmapData, mapData, loading, error } = useDashboardData(filters);

  return (
    <div className="p-4 sm:p-6 lg:p-8 h-full overflow-y-auto bg-slate-900 text-slate-50 w-full min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Título arriba a la izquierda */}
        <header className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <LayoutDashboard size={28} className="text-[#ffb05a]" />
              <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-500 tracking-tight">
                Panel de Control
              </h1>
            </div>
            <p className="mt-1 font-medium" style={{ color: '#c9a479' }}>Análisis de privacidad y rastreo de cookies.</p>
          </div>
          <div className="flex items-center gap-3 text-sm px-4 py-2 rounded-full" style={{ color: '#c9a479', background: 'rgba(43,22,8,0.5)', border: '1px solid rgba(230,172,92,0.25)' }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#e0973f' }}></span>
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
          <aside className="w-full lg:w-64 xl:w-56 shrink-0 lg:sticky lg:top-6 flex flex-col gap-4">
            <DashboardFilters filters={filters} onChange={setFilters} />
            
            {/* Botón para alternar entre Gráficos y Mapa con vectores */}
            <button
              onClick={() => setActiveTab(activeTab === 'graficos' ? 'mapa' : 'graficos')}
              className="w-full bg-slate-800/60 hover:bg-[#e0973f] text-[#e0973f] hover:text-slate-900 border border-[#e0973f]/30 hover:border-[#e0973f] transition-all duration-300 rounded-xl py-3 px-4 font-bold tracking-wide shadow-sm flex items-center justify-center gap-2.5 group cursor-pointer"
            >
              {activeTab === 'graficos' ? (
                <>
                  <Globe className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  <span>MAPA MUNDIAL</span>
                </>
              ) : (
                <>
                  <Cookie className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                  <span>VER GRÁFICOS</span>
                </>
              )}
            </button>
          </aside>

          {/* Panel Principal Condicional */}
          <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-full">
            {activeTab === 'graficos' ? (
              <>
                <div className="min-w-0">
                  <MainLineChart tendencias={tendencias} loading={loading} />
                </div>
                <div className="min-w-0">
                  <HeatMap heatmapData={heatmapData} loading={loading} />
                </div>
              </>
            ) : (
              <div className="lg:col-span-2 min-w-0">
                <WorldMap mapData={mapData} loading={loading} />
              </div>
            )}
          </main>

        </div>

      </div>
    </div>
  );
}