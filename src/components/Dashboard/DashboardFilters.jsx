import React from 'react';
import { Calendar, Globe, Filter } from 'lucide-react';
import { useFilterOptions } from '../../hooks/useFilterOptions';

export default function DashboardFilters({ filters, onChange }) {
  const { anios, regiones } = useFilterOptions();

  return (
    <div className="flex flex-col bg-slate-800/50 backdrop-blur-md p-5 rounded-2xl shadow-sm border border-slate-700 gap-6">
      <div className="flex items-center gap-3 text-slate-300">
        <div className="p-2 bg-blue-500/10 rounded-lg">
          <Filter size={18} className="text-blue-400" />
        </div>
        <h3 className="text-sm font-semibold text-white tracking-wide uppercase">Filtros</h3>
      </div>

      <div className="flex flex-col gap-5">
        {/* Año */}
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5 ml-1">Año</label>
          <div className="flex items-center bg-slate-900/50 rounded-xl px-4 py-2.5 border border-slate-700/50 focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/50 transition-all shadow-inner w-full">
            <Calendar size={16} className="text-slate-400 mr-3 shrink-0" />
            <select
              className="bg-transparent text-sm text-slate-200 outline-none cursor-pointer appearance-none w-full"
              value={filters.anio}
              onChange={e => onChange({ ...filters, anio: e.target.value })}
            >
              <option value="" className="bg-slate-800 text-white">Todos los años</option>
              {anios.map(a => (
                <option key={a} value={a} className="bg-slate-800 text-white">{a}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Región */}
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5 ml-1">Región</label>
          <div className="flex items-center bg-slate-900/50 rounded-xl px-4 py-2.5 border border-slate-700/50 focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/50 transition-all shadow-inner w-full">
            <Globe size={16} className="text-slate-400 mr-3 shrink-0" />
            <select
              className="bg-transparent text-sm text-slate-200 outline-none cursor-pointer appearance-none w-full"
              value={filters.region}
              onChange={e => onChange({ ...filters, region: e.target.value })}
            >
              <option value="" className="bg-slate-800 text-white">Todas las regiones</option>
              {regiones.map(r => (
                <option key={r} value={r} className="bg-slate-800 text-white">{r}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Active badges + clear */}
        {(filters.anio || filters.region) && (
          <div className="flex flex-col gap-2">
            {filters.anio && (
              <span className="text-xs bg-blue-500/15 text-blue-300 border border-blue-500/25 px-2.5 py-1 rounded-full font-medium text-center">
                📅 {filters.anio}
              </span>
            )}
            {filters.region && (
              <span className="text-xs bg-emerald-500/15 text-emerald-300 border border-emerald-500/25 px-2.5 py-1 rounded-full font-medium text-center">
                🌍 {filters.region}
              </span>
            )}
            <button
              onClick={() => onChange({ anio: '', region: '' })}
              className="text-xs text-slate-400 hover:text-rose-400 transition-colors py-1 rounded-lg hover:bg-rose-500/10 w-full"
            >
              Limpiar filtros ✕
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
