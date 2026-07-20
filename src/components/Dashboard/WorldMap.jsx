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

// ─── Colour palette by region — tonos "galleta" (antes azul/verde/naranja/violeta) ──
const REGION_COLORS = {
  'Europa':        { bg: '#c9973f', glow: '#e6b566', text: '#fde9c8', ring: '#c9973f55' }, // miel
  'Latinoamérica': { bg: '#8a520d', glow: '#b8721e', text: '#f0cf8e', ring: '#8a520d55' }, // caramelo
  'Norteamérica':  { bg: '#6b3410', glow: '#8a4a12', text: '#e3c9a0', ring: '#6b341055' }, // chocolate
  'Global':        { bg: '#a8571f', glow: '#c9713a', text: '#f3ddb0', ring: '#a8571f55' }, // canela
};
const DEFAULT_COLOR = { bg: '#7a5c3e', glow: '#9c7a54', text: '#e5d9c5', ring: '#7a5c3e55' };

function getCol(region) { return REGION_COLORS[region] || DEFAULT_COLOR; }

const FLAGS = { PE:'🇵🇪', CL:'🇨🇱', ES:'🇪🇸', AR:'🇦🇷', BR:'🇧🇷', DE:'🇩🇪', US:'🇺🇸', MX:'🇲🇽', CO:'🇨🇴' };

// ─── Metric bar ───────────────────────────────────────────────────────────────
function MetricBar({ label, value, max = 100, color }) {
  const pct = value != null ? Math.min((value / max) * 100, 100) : 0;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10 }}>
        <span style={{ color: '#c9a479' }}>{label}</span>
        <span style={{ color, fontWeight: 700 }}>{value != null ? value : 'N/A'}</span>
      </div>
      <div style={{ height: 3, background: '#3b1f0d', borderRadius: 99, overflow: 'hidden' }}>
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
      background: 'rgba(43,22,8,0.97)',
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
          <div style={{ color: '#fff3d6', fontWeight: 700, fontSize: 13 }}>{country.nombre_pais}</div>
          <div style={{ color: col.glow, fontSize: 10, fontWeight: 600 }}>{country.region}</div>
        </div>
        {country.tiene_gdpr
          ? <span style={{ background: '#10b98118', color: '#34d399', fontSize: 9, padding: '2px 7px', borderRadius: 99, border: '1px solid #10b98140', whiteSpace: 'nowrap' }}>GDPR ✓</span>
          : <span style={{ background: '#ef444418', color: '#f87171', fontSize: 9, padding: '2px 7px', borderRadius: 99, border: '1px solid #ef444440', whiteSpace: 'nowrap' }}>Sin GDPR</span>
        }
      </div>
      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: 8 }} />
      {/* Metrics */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <MetricBar label="Cookies Internet"  value={country.cookies_internet}  color="#e6b566" />
        <MetricBar label="Privacidad Online"  value={country.privacidad_online} color="#b8721e" />
        <MetricBar label="Datos Personales"   value={country.datos_personales}  color="#c9713a" />
        <MetricBar
          label="Tasa de Rastreo (%)"
          value={country.tracked != null ? (country.tracked * 100).toFixed(1) : null}
          color="#8a4a12"
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
        background: 'radial-gradient(circle at 25% 0%, rgba(255,214,153,0.35), transparent 60%), linear-gradient(160deg, #e0973f 0%, #c17817 45%, #8a520d 100%)',
        border: '1px solid rgba(255,214,153,0.35)',
        borderRadius: 22,
        padding: 24,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div style={{
        position:'absolute', top:-100, right:-100, width:350, height:350,
        background:'radial-gradient(circle,rgba(255,217,138,.45) 0%,transparent 70%)',
        borderRadius:'50%', pointerEvents:'none',
      }} />

      {/* ── Header ─────────────────────────────────────── */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:18, flexWrap:'wrap', gap:12 }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ padding:8, background:'rgba(43,22,8,.22)', borderRadius:10, display:'flex' }}>
            <Globe size={20} color="#fff3d6" />
          </div>
          <div>
            <h2 style={{ color:'#fff3d6', fontWeight:700, fontSize:16, margin:0, textShadow:'0 1px 3px rgba(0,0,0,0.4)' }}>Países Monitoreados</h2>
            <p style={{ color:'#f3ddb0', fontSize:12, margin:'2px 0 0' }}>
              {loading ? 'Cargando…' : `${visibleCodes.length} países · Pasa el cursor para ver métricas`}
            </p>
          </div>
        </div>

        {/* Legend */}
        <div style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
          {Object.entries(REGION_COLORS).filter(([r]) => r !== 'Global').map(([region, col]) => (
            <div key={region} style={{ display:'flex', alignItems:'center', gap:6 }}>
              <div style={{ width:9, height:9, borderRadius:'50%', background:col.bg, boxShadow:`0 0 7px ${col.glow}` }} />
              <span style={{ color:'#fff3d6', fontSize:11, fontWeight:600, textShadow:'0 1px 2px rgba(0,0,0,0.3)' }}>{region}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Map SVG ────────────────────────────────────── */}
      <div
        ref={svgRef}
        style={{ position:'relative', borderRadius:14, overflow:'hidden', background:'#fff3d6', border:'1px solid rgba(139,90,20,.25)' }}
        onMouseLeave={() => setHovered(null)}
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          style={{ width:'100%', display:'block', maxHeight:440 }}
        >
          <defs>
            <radialGradient id="oceanGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#fff8e8" />
              <stop offset="100%" stopColor="#f0cf8e" />
            </radialGradient>
            <filter id="landShadow">
              <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#3b1f0d" floodOpacity="0.35" />
            </filter>
            <filter id="pinBloom">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Ocean (masa de galleta) */}
          <path d={sphere} fill="url(#oceanGrad)" />

          {/* Graticule (subtle grid) */}
          {[-60,-30,0,30,60].map(lat => {
            const p1 = projection([-180, lat]);
            const p2 = projection([ 180, lat]);
            if (!p1 || !p2) return null;
            return <line key={`lat${lat}`} x1={p1[0]} y1={p1[1]} x2={p2[0]} y2={p2[1]}
              stroke={lat === 0 ? 'rgba(139,74,26,.3)' : 'rgba(139,74,26,.09)'}
              strokeWidth={lat === 0 ? 1 : 0.5} strokeDasharray={lat === 0 ? '4 4' : '0'} />;
          })}
          {[-120,-60,0,60,120].map(lon => {
            const pts = Array.from({length:50},(_,i) => projection([lon, -90 + i*3.6])).filter(Boolean);
            const d = pts.map((p,i) => `${i===0?'M':'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
            return <path key={`lon${lon}`} d={d} fill="none" stroke="rgba(139,74,26,.06)" strokeWidth="0.5" />;
          })}

          {/* Countries (trocitos de chocolate) */}
          {countries.map(c => (
            <path
              key={c.id}
              d={pathGen(c)}
              fill="#6b3410"
              stroke="#8a520d"
              strokeWidth="0.4"
              filter="url(#landShadow)"
            />
          ))}

          {/* Ocean sphere outline */}
          <path d={sphere} fill="none" stroke="rgba(139,74,26,.35)" strokeWidth="1" />

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
                  stroke={isHov ? '#3b1f0d' : col.glow}
                  strokeWidth={isHov ? 2 : 1.5}
                  style={{ transition: 'r .15s ease, stroke .15s ease' }}
                  filter="url(#pinBloom)"
                />

                {/* GDPR dot */}
                {country?.tiene_gdpr && (
                  <circle cx={px + R * 0.65} cy={py - R * 0.65} r={3}
                    fill="#15803d" stroke="#fff3d6" strokeWidth="1" />
                )}

                {/* Country code */}
                <text x={px} y={py + R + 11} textAnchor="middle"
                  fill="#3b1f0d" fontSize={isHov ? 9 : 8} fontWeight="700"
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
            position:'absolute', inset:0, background:'rgba(255,243,214,.85)',
            display:'flex', alignItems:'center', justifyContent:'center',
            backdropFilter:'blur(3px)', borderRadius:14,
          }}>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
              <div style={{ width:36, height:36, border:'3px solid rgba(139,90,20,.2)', borderTopColor:'#c17817', borderRadius:'50%', animation:'spin .8s linear infinite' }} />
              <span style={{ color:'#8a6a45', fontSize:13 }}>Cargando mapa…</span>
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
                  background: isHov ? `${col.bg}30` : `${col.bg}18`,
                  border:`1px solid ${isHov ? col.bg : col.bg+'50'}`,
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
                <span style={{ color:'#fff3d6', fontWeight:600, textShadow:'0 1px 2px rgba(0,0,0,0.3)' }}>{c.nombre_pais}</span>
                {c.tiene_gdpr && <span style={{ color:'#d1fae5', fontSize:10, fontWeight:700 }}>✓ GDPR</span>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
