import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

export function useDashboardData(filters) {
  const { anio, region } = filters;

  const [kpis, setKpis] = useState(null);
  const [tendencias, setTendencias] = useState([]);
  const [heatmapData, setHeatmapData] = useState([]);
  const [mapData, setMapData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError(null);
      try {
        await Promise.all([
          fetchKpis(anio, region, setKpis),
          fetchTendencias(anio, region, setTendencias),
          fetchHeatmap(anio, region, setHeatmapData),
          fetchMapData(anio, region, setMapData),
        ]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [anio, region]);

  return { kpis, tendencias, heatmapData, mapData, loading, error };
}

// ---------- Helpers ----------
const avg = (arr, key) => {
  const vals = arr?.map(r => r[key]).filter(v => v != null) ?? [];
  return vals.length ? (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1) : '0';
};

// Retorna lista de id_pais filtrada por región (filtrando en JS para evitar problemas con acentos)
async function getPaisIdsByRegion(region) {
  const { data } = await supabase.from('Dim_Pais').select('id_pais, region');
  if (!data) return null;
  if (!region) return null;
  return data.filter(p => p.region === region).map(p => p.id_pais);
}

// Retorna lista de id_tiempo filtrada por año
async function getTiempoIds(anio) {
  const { data } = await supabase.from('Dim_Tiempo').select('id_tiempo, anio, mes, trimestre');
  if (!data) return { ids: [], map: {} };
  const filtered = anio ? data.filter(t => String(t.anio) === String(anio)) : data;
  const map = {};
  filtered.forEach(t => { map[t.id_tiempo] = { mes: t.mes, trimestre: t.trimestre, anio: t.anio }; });
  return { ids: filtered.map(t => t.id_tiempo), map };
}

// ---------- KPIs ----------
async function fetchKpis(anio, region, setKpis) {
  // Países totales (sin filtro de acentos en la URL)
  const { data: paises } = await supabase.from('Dim_Pais').select('id_pais, tiene_gdpr, region');
  const paisesFiltrados = region ? paises?.filter(p => p.region === region) : paises;
  const totalPaises = paisesFiltrados?.length ?? 0;
  const totalGdpr = paisesFiltrados?.filter(p => p.tiene_gdpr).length ?? 0;

  // Promedios de tendencias google
  let tendQuery = supabase
    .from('Fact_Google_Trends')
    .select('cookies_internet, privacidad_online, datos_personales, id_tiempo, id_pais');

  const { data: tendData, error: tendError } = await tendQuery;

  // Filtrar en JS
  let tendFiltradas = tendData ?? [];
  if (anio) {
    const { ids: tIds } = await getTiempoIds(anio);
    tendFiltradas = tendFiltradas.filter(r => tIds.includes(r.id_tiempo));
  }
  if (region) {
    const paisIds = await getPaisIdsByRegion(region);
    if (paisIds) tendFiltradas = tendFiltradas.filter(r => paisIds.includes(r.id_pais));
  }

  // Promedio uso de datos kb (seguimiento de hechos)
  const { data: segData } = await supabase
    .from('Fact_Tracking')
    .select('data_usage_kb');
  const avgUsoKb = avg(segData ?? [], 'data_usage_kb');

  setKpis({
    totalPaises,
    totalGdpr,
    avgCookiesInternet: avg(tendFiltradas, 'cookies_internet'),
    avgUsoKb,
  });
}

// ---------- TENDENCIAS (Gráfico de Líneas) ----------
async function fetchTendencias(anio, region, setTendencias) {
  const { ids: tiempoIds, map: tiempoMap } = await getTiempoIds(anio);

  // Datos crudos de tendencias
  const { data: rows } = await supabase
    .from('Fact_Google_Trends')
    .select('id_tiempo, id_pais, cookies_internet, privacidad_online, datos_personales');

  let filtradas = rows ?? [];

  // Filtrar por tiempo
  if (tiempoIds.length) {
    filtradas = filtradas.filter(r => tiempoIds.includes(r.id_tiempo));
  }

  // Filtrar por región en JS
  if (region) {
    const paisIds = await getPaisIdsByRegion(region);
    if (paisIds) filtradas = filtradas.filter(r => paisIds.includes(r.id_pais));
  }

  // Obtener todos los tiempos para construir el label
  const { data: allTiempos } = await supabase.from('Dim_Tiempo').select('id_tiempo, anio, mes');
  const labelMap = {};
  allTiempos?.forEach(t => {
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    labelMap[t.id_tiempo] = `${meses[t.mes - 1] || t.mes} ${t.anio}`;
  });

  // Agrupar por período y promediar
  const grouped = {};
  filtradas.forEach(row => {
    const label = labelMap[row.id_tiempo] || `T${row.id_tiempo}`;
    const tiempoInfo = allTiempos?.find(t => t.id_tiempo === row.id_tiempo);
    const sortKey = tiempoInfo ? tiempoInfo.anio * 100 + tiempoInfo.mes : row.id_tiempo;
    if (!grouped[label]) grouped[label] = { cookies_internet: [], privacidad_online: [], datos_personales: [], sortKey };
    if (row.cookies_internet != null) grouped[label].cookies_internet.push(row.cookies_internet);
    if (row.privacidad_online != null) grouped[label].privacidad_online.push(row.privacidad_online);
    if (row.datos_personales != null) grouped[label].datos_personales.push(row.datos_personales);
  });

  const resultado = Object.entries(grouped)
    .map(([name, vals]) => ({
      name,
      sortKey: vals.sortKey,
      'Cookies Internet': vals.cookies_internet.length ? +(vals.cookies_internet.reduce((a, b) => a + b, 0) / vals.cookies_internet.length).toFixed(2) : 0,
      'Privacidad Online': vals.privacidad_online.length ? +(vals.privacidad_online.reduce((a, b) => a + b, 0) / vals.privacidad_online.length).toFixed(2) : 0,
      'Datos Personales': vals.datos_personales.length ? +(vals.datos_personales.reduce((a, b) => a + b, 0) / vals.datos_personales.length).toFixed(2) : 0,
    }))
    .sort((a, b) => a.sortKey - b.sortKey)
    .slice(0, 24);

  setTendencias(resultado);
}

// ---------- HEATMAP (Seguimiento de hechos) ----------
async function fetchHeatmap(anio, region, setHeatmapData) {
  const { ids: tiempoIds, map: tiempoMap } = await getTiempoIds(anio);

  const { data: rows } = await supabase
    .from('Fact_Tracking')
    .select('id_tiempo, id_pais, tracked');

  let filtradas = rows ?? [];

  if (tiempoIds.length) {
    filtradas = filtradas.filter(r => tiempoIds.includes(r.id_tiempo));
  }

  if (region) {
    const paisIds = await getPaisIdsByRegion(region);
    if (paisIds) filtradas = filtradas.filter(r => paisIds.includes(r.id_pais));
  }

  // Agrupar por trimestre y mes
  const grouped = {};
  filtradas.forEach(row => {
    const t = tiempoMap[row.id_tiempo];
    if (!t) return;
    const key = `${t.trimestre}-${t.mes}`;
    if (!grouped[key]) grouped[key] = { trimestre: t.trimestre, mes: t.mes, values: [] };
    if (row.tracked != null) grouped[key].values.push(row.tracked);
  });

  const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  const resultado = Object.values(grouped).map(g => ({
    trimestre: g.trimestre,
    mes: meses[g.mes - 1] || `M${g.mes}`,
    mesNum: g.mes,
    value: g.values.length ? +(g.values.reduce((a, b) => a + b, 0) / g.values.length).toFixed(1) : 0,
  }));

  setHeatmapData(resultado.sort((a, b) => a.mesNum - b.mesNum));
}

// ---------- MAPA (datos por país) ----------
async function fetchMapData(anio, region, setMapData) {
  // Cargar todos los países
  const { data: paises } = await supabase
    .from('Dim_Pais')
    .select('id_pais, codigo_pais, nombre_pais, region, tiene_gdpr');
  if (!paises) { setMapData([]); return; }

  // Filtrar países por región si aplica
  const paisesFiltrados = region
    ? paises.filter(p => p.region === region && p.codigo_pais !== 'GLOBAL')
    : paises.filter(p => p.codigo_pais !== 'GLOBAL');

  const paisIds = paisesFiltrados.map(p => p.id_pais);

  // Obtener ids de tiempo si hay filtro de año
  let tiempoIds = null;
  if (anio) {
    const { ids } = await getTiempoIds(anio);
    tiempoIds = ids;
  }

  // Tendencias por país
  const { data: trends } = await supabase
    .from('Fact_Google_Trends')
    .select('id_pais, id_tiempo, cookies_internet, privacidad_online, datos_personales');

  // Tracking por país
  const { data: tracking } = await supabase
    .from('Fact_Tracking')
    .select('id_pais, id_tiempo, tracked');

  // Filtrar por tiempo si aplica
  const filterByTime = rows =>
    tiempoIds ? rows?.filter(r => tiempoIds.includes(r.id_tiempo)) ?? [] : rows ?? [];

  const trendsFilt = filterByTime(trends);
  const trackFilt = filterByTime(tracking);

  // Agrupar promedios por país
  const result = paisesFiltrados.map(pais => {
    const pt = trendsFilt.filter(r => r.id_pais === pais.id_pais);
    const pk = trackFilt.filter(r => r.id_pais === pais.id_pais);

    const avgField = (rows, key) => {
      const vals = rows.map(r => r[key]).filter(v => v != null);
      return vals.length ? +(vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2) : null;
    };

    return {
      id_pais: pais.id_pais,
      codigo_pais: pais.codigo_pais,
      nombre_pais: pais.nombre_pais,
      region: pais.region,
      tiene_gdpr: pais.tiene_gdpr,
      cookies_internet: avgField(pt, 'cookies_internet'),
      privacidad_online: avgField(pt, 'privacidad_online'),
      datos_personales: avgField(pt, 'datos_personales'),
      tracked: avgField(pk, 'tracked'),
    };
  });

  setMapData(result);
}
