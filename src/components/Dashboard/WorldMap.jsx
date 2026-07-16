import React, { useState, useMemo } from 'react';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import { Globe } from 'lucide-react';
import worldAtlas from 'world-atlas/countries-110m.json';

// ─── Map dimensions ───────────────────────────────────────────────────────────
const W = 960;
const H = 500;

const projection = geoNaturalEarth1()
  .scale(155)
  .translate([W / 2, H / 2 + 20]);

const pathGen = geoPath(projection);

// ─── Exact capital / centroid coordinates [lon, lat] ─────────────────────────
const COUNTRY_COORDS = {
  PE: [-77.03,  -12.07],   // Lima
  CL: [-70.67,  -33.45],   // Santiago
  ES: [  -3.70,   40.42],  // Madrid
  AR: [ -58.38,  -34.61],  // Buenos Aires
  BR: [ -47.93,  -15.78],  // Brasilia
  DE: [  13.41,   52.52],  // Berlin
  US: [ -77.03,   38.89],  // Washington D.C.
  MX: [ -99.13,   19.43],  // Ciudad de México
  CO: [ -74.08,    4.71],  // Bogotá
};

// ─── Colour palette by region ─────────────────────────────────────────────────
const REGION_COLORS = {
  'Europa':        { bg: '#3b82f6', glow: '#60a5fa', text: '#bfdbfe', ring: '#3b82f655' },
  'Latinoamérica': { bg: '#10b981', glow: '#34d399', text: '#a7f3d0', ring: '#10b98155' },
  'Norteamérica':  { bg: '#f59e0b', glow: '#fbbf24', text: '#fde68a', ring: '#f59e0b55' },
  'Global':        { bg: '#8b5cf6', glow: '#a78bfa', text: '#ddd6fe', ring: '#8b5cf655' },
};
const DEFAULT_COLOR = { bg: '#6b7280', glow: '#9ca3af', text: '#e5e7eb', ring: '#6b728055' };

function getCol(region) { return REGION_COLORS[region] || DEFAULT_COLOR; }

const FLAGS = { PE:'🇵🇪', CL:'🇨🇱', ES:'🇪🇸', AR:'🇦🇷', BR:'🇧🇷', DE:'🇩🇪', US:'🇺🇸', MX:'🇲🇽', CO:'🇨🇴' };

// ─── Metric bar ───────────────────────────────────────────────────────────────
function MetricBar({ label, value, max = 100, color }) {
  const pct = value != null ? Math.min((value / max) * 100, 100) : 0;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10 }}>
        <span style={{ color: '#94a3b8' }}>{label}</span>
        <span style={{ color, fontWeight: 700 }}>{value != null ? value : 'N/A'}</span>
      </div>
      <div style={{ height: 3, background: '#1e293b', borderRadius: 99, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 99, transition: 'width .4s ease' }} />
      </div>
    </div>
  );
}

// ─── Tooltip rendered as HTML overlay (not SVG foreignObject) ─────────────────
function Tooltip({ country, screenPos, svgRect }) {
  if (!country || !screenPos || !svgRect) return null;
  const col = getCol(country.region);

  const tipW = 220;
  const tipH = 190;

  // Position relative to SVG container
  let left = screenPos.x + 14;
  let top  = screenPos.y + 14;
  if (left + tipW > svgRect.width  - 10) left = screenPos.x - tipW - 14;
  if (top  + tipH > svgRect.height - 10) top  = screenPos.y - tipH - 14;

  return (
    <div style={{
      position: 'absolute', left, top,
      width: tipW, pointerEvents: 'none', zIndex: 50,
      background: 'rgba(8,18,36,0.97)',
      border: `1px solid ${col.ring}`,
      borderRadius: 14,
      padding: '12px 14px',
      boxShadow: `0 0 24px ${col.ring}, 0 8px 32px rgba(0,0,0,0.5)`,
      backdropFilter: 'blur(12px)',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <span style={{ fontSize: 22, lineHeight: 1 }}>{FLAGS[country.codigo_pais] || '🌐'}</span>
        <div style={{ flex: 1 }}>
          <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 13 }}>{country.nombre_pais}</div>
          <div style={{ color: col.glow, fontSize: 10, fontWeight: 600 }}>{country.region}</div>
        </div>
        {country.tiene_gdpr
          ? <span style={{ background: '#10b98118', color: '#34d399', fontSize: 9, padding: '2px 7px', borderRadius: 99, border: '1px solid #10b98140', whiteSpace: 'nowrap' }}>GDPR ✓</span>
          : <span style={{ background: '#ef444418', color: '#f87171', fontSize: 9, padding: '2px 7px', borderRadius: 99, border: '1px solid #ef444440', whiteSpace: 'nowrap' }}>Sin GDPR</span>
        }
      </div>
      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 8 }} />
      {/* Metrics */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <MetricBar label="Cookies Internet"  value={country.cookies_internet}  color="#60a5fa" />
        <MetricBar label="Privacidad Online"  value={country.privacidad_online} color="#34d399" />
        <MetricBar label="Datos Personales"   value={country.datos_personales}  color="#a78bfa" />
        <MetricBar
          label="Tasa de Rastreo (%)"
          value={country.tracked != null ? (country.tracked * 100).toFixed(1) : null}
          color="#fb923c"
        />
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function WorldMap({ mapData = [], loading }) {
  const [hovered, setHovered]       = useState(null);
  const [screenPos, setScreenPos]   = useState(null);
  const [svgRect, setSvgRect]       = useState(null);
  const svgRef = React.useRef(null);

  // Precompute world outlines
  const countries = useMemo(
    () => feature(worldAtlas, worldAtlas.objects.countries).features,
    []
  );
  const sphere = useMemo(() => pathGen({ type: 'Sphere' }), []);

  // Build lookup
  const dataByCode = {};
  mapData.forEach(c => { dataByCode[c.codigo_pais] = c; });

  const visibleCodes = (mapData.length > 0
    ? mapData.map(c => c.codigo_pais)
    : Object.keys(COUNTRY_COORDS)
  ).filter(c => COUNTRY_COORDS[c]);

  function handleMouseMove(code, e) {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSvgRect(rect);
    setScreenPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setHovered(dataByCode[code] || { codigo_pais: code, nombre_pais: code });
  }

  return (
    <div
      id="world-map-section"
      style={{
        background: 'linear-gradient(135deg,rgba(15,23,42,.97) 0%,rgba(17,34,85,.92) 60%,rgba(15,23,42,.97) 100%)',
        border: '1px solid rgba(59,130,246,.2)',
        borderRadius: 22,
        padding: 24,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background orb */}
      <div style={{
        position:'absolute', top:-100, right:-100, width:350, height:350,
        background:'radial-gradient(circle,rgba(59,130,246,.07) 0%,transparent 70%)',
        borderRadius:'50%', pointerEvents:'none',
      }} />

      {/* ── Header ─────────────────────────────────────── */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:18, flexWrap:'wrap', gap:12 }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ padding:8, background:'rgba(59,130,246,.12)', borderRadius:10, display:'flex' }}>
            <Globe size={20} color="#60a5fa" />
          </div>
          <div>
            <h2 style={{ color:'#f1f5f9', fontWeight:700, fontSize:16, margin:0 }}>Países Monitoreados</h2>
            <p style={{ color:'#64748b', fontSize:12, margin:'2px 0 0' }}>
              {loading ? 'Cargando…' : `${visibleCodes.length} países · Pasa el cursor para ver métricas`}
            </p>
          </div>
        </div>

        {/* Legend */}
        <div style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
          {Object.entries(REGION_COLORS).filter(([r]) => r !== 'Global').map(([region, col]) => (
            <div key={region} style={{ display:'flex', alignItems:'center', gap:6 }}>
              <div style={{ width:9, height:9, borderRadius:'50%', background:col.bg, boxShadow:`0 0 7px ${col.glow}` }} />
              <span style={{ color:col.text, fontSize:11, fontWeight:600 }}>{region}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Map SVG ────────────────────────────────────── */}
      <div
        ref={svgRef}
        style={{ position:'relative', borderRadius:14, overflow:'hidden', background:'#050e1d', border:'1px solid rgba(59,130,246,.12)' }}
        onMouseLeave={() => setHovered(null)}
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          style={{ width:'100%', display:'block', maxHeight:440 }}
        >
          <defs>
            <radialGradient id="oceanGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#061220" />
              <stop offset="100%" stopColor="#030810" />
            </radialGradient>
            <filter id="landShadow">
              <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#000" floodOpacity="0.5" />
            </filter>
            <filter id="pinBloom">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Ocean */}
          <path d={sphere} fill="url(#oceanGrad)" />

          {/* Graticule (subtle grid) */}
          {[-60,-30,0,30,60].map(lat => {
            const p1 = projection([-180, lat]);
            const p2 = projection([ 180, lat]);
            if (!p1 || !p2) return null;
            return <line key={`lat${lat}`} x1={p1[0]} y1={p1[1]} x2={p2[0]} y2={p2[1]}
              stroke={lat === 0 ? 'rgba(59,130,246,.15)' : 'rgba(255,255,255,.035)'}
              strokeWidth={lat === 0 ? 1 : 0.5} strokeDasharray={lat === 0 ? '4 4' : '0'} />;
          })}
          {[-120,-60,0,60,120].map(lon => {
            const pts = Array.from({length:50},(_,i) => projection([lon, -90 + i*3.6])).filter(Boolean);
            const d = pts.map((p,i) => `${i===0?'M':'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
            return <path key={`lon${lon}`} d={d} fill="none" stroke="rgba(255,255,255,.03)" strokeWidth="0.5" />;
          })}

          {/* Countries */}
          {countries.map(c => (
            <path
              key={c.id}
              d={pathGen(c)}
              fill="#0f2240"
              stroke="#1a3a60"
              strokeWidth="0.4"
              filter="url(#landShadow)"
            />
          ))}

          {/* Ocean sphere outline */}
          <path d={sphere} fill="none" stroke="rgba(59,130,246,.18)" strokeWidth="1" />

          {/* ── Country Pins ── */}
          {visibleCodes.map(code => {
            const coords  = COUNTRY_COORDS[code];
            const proj    = projection(coords);
            if (!proj) return null;
            const [px, py] = proj;
            const country  = dataByCode[code];
            const region   = country?.region || 'Norteamérica';
            const col      = getCol(region);
            const isHov    = hovered?.codigo_pais === code;
            const R        = isHov ? 11 : 8;

            return (
              <g
                key={code}
                style={{ cursor:'pointer' }}
                onMouseMove={e => handleMouseMove(code, e)}
                onMouseEnter={e => handleMouseMove(code, e)}
              >
                {/* Animated pulse rings */}
                <circle cx={px} cy={py} r={R + 4} fill="none" stroke={col.glow} strokeWidth="1.2" opacity="0">
                  <animate attributeName="r"       from={R+2} to={R+18} dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.6" to="0"    dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx={px} cy={py} r={R + 1} fill="none" stroke={col.glow} strokeWidth="0.8" opacity="0">
                  <animate attributeName="r"       from={R}   to={R+12} dur="2s" begin="0.6s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.4" to="0"    dur="2s" begin="0.6s" repeatCount="indefinite" />
                </circle>

                {/* Glow halo */}
                <circle cx={px} cy={py} r={R + 3} fill={col.bg} opacity="0.18" filter="url(#pinBloom)" />

                {/* Pin body */}
                <circle
                  cx={px} cy={py} r={R}
                  fill={col.bg}
                  stroke={isHov ? '#fff' : col.glow}
                  strokeWidth={isHov ? 2 : 1.5}
                  style={{ transition: 'r .15s ease, stroke .15s ease' }}
                  filter="url(#pinBloom)"
                />

                {/* GDPR dot */}
                {country?.tiene_gdpr && (
                  <circle cx={px + R * 0.65} cy={py - R * 0.65} r={3}
                    fill="#10b981" stroke="#030810" strokeWidth="1" />
                )}

                {/* Country code */}
                <text x={px} y={py + R + 11} textAnchor="middle"
                  fill={col.text} fontSize={isHov ? 9 : 8} fontWeight="700"
                  style={{ userSelect:'none', letterSpacing:.5 }}>
                  {code}
                </text>
              </g>
            );
          })}
        </svg>

        {/* HTML Tooltip (accurate positioning, no SVG foreignObject issues) */}
        <Tooltip country={hovered} screenPos={screenPos} svgRect={svgRect} />

        {/* Loading overlay */}
        {loading && (
          <div style={{
            position:'absolute', inset:0, background:'rgba(3,8,16,.75)',
            display:'flex', alignItems:'center', justifyContent:'center',
            backdropFilter:'blur(3px)', borderRadius:14,
          }}>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
              <div style={{ width:36, height:36, border:'3px solid rgba(59,130,246,.2)', borderTopColor:'#3b82f6', borderRadius:'50%', animation:'spin .8s linear infinite' }} />
              <span style={{ color:'#64748b', fontSize:13 }}>Cargando mapa…</span>
            </div>
          </div>
        )}
      </div>

      {/* ── Country chips ───────────────────────────────── */}
      {!loading && mapData.length > 0 && (
        <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginTop:16 }}>
          {mapData.filter(c => c.codigo_pais !== 'GLOBAL').map(c => {
            const col = getCol(c.region);
            const isHov = hovered?.codigo_pais === c.codigo_pais;
            return (
              <div
                key={c.codigo_pais}
                style={{
                  display:'flex', alignItems:'center', gap:6,
                  padding:'5px 12px',
                  background: isHov ? `${col.bg}30` : `${col.bg}15`,
                  border:`1px solid ${isHov ? col.bg : col.bg+'40'}`,
                  borderRadius:99, fontSize:12, cursor:'default',
                  transition:'all .2s ease',
                  boxShadow: isHov ? `0 0 10px ${col.ring}` : 'none',
                }}
                onMouseEnter={e => {
                  const rect = svgRef.current?.getBoundingClientRect();
                  setSvgRect(rect);
                  setScreenPos({ x: e.clientX - (rect?.left||0), y: e.clientY - (rect?.top||0) });
                  setHovered(c);
                }}
                onMouseLeave={() => setHovered(null)}
              >
                <span style={{ fontSize:14 }}>{FLAGS[c.codigo_pais] || '🌐'}</span>
                <span style={{ color:col.text, fontWeight:600 }}>{c.nombre_pais}</span>
                {c.tiene_gdpr && <span style={{ color:'#34d399', fontSize:10, fontWeight:700 }}>✓ GDPR</span>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
