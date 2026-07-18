import { useState, useEffect } from 'react';

const ConsultasAnaliticas = () => {
  // Lista de tus consultas analíticas (CA1 a CA11) con la sintaxis corregida
  const consultas = [
    { 
      id: "CA1", 
      pregunta: "¿Cuántos sitios web rastrean al usuario mediante cookies SameSite=None, analizados por país y por mes?", 
      embedUrl: "https://app.powerbi.com/view?r=eyJrIjoiZTdhOTllNzMtOTYyYi00NzNiLWJhZWQtZWUyOTAzMjU5N2ZkIiwidCI6ImM1ZDIzYjA5LWFmMDEtNGFlYy1hYjc0LTdhNWQxZGEwMTA4NCJ9"
    },
    { 
      id: "CA2", 
      pregunta: "¿Cuánto ha crecido el rastreo por fingerprinting en Perú respecto al promedio global, entre 2021 y 2026?", 
      embedUrl: "https://app.powerbi.com/view?r=eyJrIjoiN2FmOWFjYzctOGMwMS00MTI2LWJlOTItODg5YzE0NmVlYzRhIiwidCI6ImM1ZDIzYjA5LWFmMDEtNGFlYy1hYjc0LTdhNWQxZGEwMTA4NCJ9"
    }, 
    { 
      id: "CA3", 
      pregunta: "¿Cuáles son los trackers con mayor reach en la categoría advertising, analizados por trimestre y por país de Latinoamérica?", 
      embedUrl: "https://app.powerbi.com/view?r=eyJrIjoiYThkZjgxMzAtYzMyYy00ODNmLWE2NWQtM2RmOWY2NmVmYmFlIiwidCI6ImM1ZDIzYjA5LWFmMDEtNGFlYy1hYjc0LTdhNWQxZGEwMTA4NCJ9"
    }, 
    { 
      id: "CA4", 
      pregunta: "¿Cuántos KB de datos transfiere cada track por página, clasificado por categoría y país?", 
      embedUrl: "https://app.powerbi.com/view?r=eyJrIjoiZGNmZGVhOTctN2ZjMy00N2UwLTliN2YtNDJjNGUwZWUxNjY1IiwidCI6ImM1ZDIzYjA5LWFmMDEtNGFlYy1hYjc0LTdhNWQxZGEwMTA4NCJ9"
    }, 
    { 
      id: "CA5", 
      pregunta: "¿Cuántas veces más rastrea un tracker de social media comparado con uno de analytics, analizado por mes?", 
      embedUrl: "https://app.powerbi.com/view?r=eyJrIjoiOWU2ZWZhMTYtZDY4Ny00NTBkLTk3NjctMzBkZDdlYzJmNDA0IiwidCI6ImM1ZDIzYjA5LWFmMDEtNGFlYy1hYjc0LTdhNWQxZGEwMTA4NCJ9" 
    },
    { 
      id: "CA6", 
      pregunta: "¿Qué correlación existe entre el nivel de reach global de un tracker y su uso de fingerprinting, por año?", 
      embedUrl: "https://app.powerbi.com/view?r=eyJrIjoiMTJmNWRkZWYtMTFiMC00MTBiLWIzOGMtYmY2MTBmNWM5NTRhIiwidCI6ImM1ZDIzYjA5LWFmMDEtNGFlYy1hYjc0LTdhNWQxZGEwMTA4NCJ9" 
    },
    { 
      id: "CA7", 
      pregunta: "¿Cuántos trackers nuevos emergieron entre 2021 y 2026 con mayor crecimiento de reach en Latinoamérica?", 
      embedUrl: "https://app.powerbi.com/view?r=eyJrIjoiYThjNjdjOWUtNzZiNi00YTk0LWI2MzMtNDg0ZWMxMjNhZTEwIiwidCI6ImM1ZDIzYjA5LWFmMDEtNGFlYy1hYjc0LTdhNWQxZGEwMTA4NCJ9"
    }, 
    { 
      id: "CA8", 
      pregunta: "¿Cuál es la diferencia de rastreo (tracked) entre Perú y países con GDPR (DE, ES), analizada por trimestre?", 
      embedUrl: "https://app.powerbi.com/view?r=eyJrIjoiNmU0M2M4MzAtMWQyNi00MDIzLWI3N2UtNWZkZTc5MWRjOGE0IiwidCI6ImM1ZDIzYjA5LWFmMDEtNGFlYy1hYjc0LTdhNWQxZGEwMTA4NCJ9"
    }, 
    { 
      id: "CA9", 
      pregunta: "¿Cuántas solicitudes HTTP genera DoubleClick por página en Perú vs el promedio global, por año?", 
      embedUrl: "" 
    },
    { 
      id: "CA10", 
      pregunta: "¿Cuándo alcanzará el fingerprinting el mismo nivel de tracked en Perú, proyectado al 2028?", 
      embedUrl: "" 
    },
    { 
      id: "CA11", 
      pregunta: "¿Existe relación entre el índice de desinformación y el nivel de rastreo técnico en Perú?", 
      embedUrl: "https://app.powerbi.com/view?r=eyJrIjoiNTJhMmVkMDYtNmQ5ZC00MDU5LTgyMjQtMDg3N2I3MjY4MDE1IiwidCI6ImM1ZDIzYjA5LWFmMDEtNGFlYy1hYjc0LTdhNWQxZGEwMTA4NCJ9" 
    }
  ];

  const [consultaActiva, setConsultaActiva] = useState(consultas[0]);
  const [loading, setLoading] = useState(false);

  // Cada vez que el usuario cambie de consulta, activamos temporalmente un estado de carga
  useEffect(() => {
    if (consultaActiva.embedUrl) {
      setLoading(true);
    }
  }, [consultaActiva]);

  return (
    <div className="flex flex-col h-screen text-slate-200 p-6 bg-slate-950">
      {/* Cabecera */}
      <header className="py-4 border-b border-slate-800 shrink-0">
        <h1 className="text-3xl font-bold text-white">Dashboards Analíticos</h1>
        <p className="mt-2 text-slate-400">
          Explora los resultados interactivos de nuestra investigación sobre la desinformación de las cookies en el usuario peruano.
        </p>
      </header>

      {/* Contenido Principal */}
      <div className="flex flex-1 mt-6 gap-6 overflow-hidden h-[calc(100vh-180px)]">
        
        {/* Sidebar de Preguntas */}
        <aside className="w-80 overflow-y-auto flex flex-col gap-2 pr-2 border-r border-slate-800 custom-scrollbar shrink-0">
          {consultas.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                if (consultaActiva.id !== c.id) {
                  setConsultaActiva(c);
                }
              }}
              className={`flex items-start gap-3 p-3 rounded-lg text-left transition-all duration-200 border ${
                consultaActiva.id === c.id
                  ? 'bg-orange-600/10 border-orange-500 text-orange-50' // Estilo Activo
                  : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-800/60 hover:text-slate-200' // Estilo Inactivo
              }`}
            >
              <span className={`px-2 py-1 rounded text-xs font-bold shrink-0 transition-colors duration-200 ${
                consultaActiva.id === c.id ? 'bg-orange-600 text-white' : 'bg-slate-800 text-slate-300'
              }`}>
                {c.id}
              </span>
              <span className="text-sm line-clamp-3 leading-snug">
                {c.pregunta}
              </span>
            </button>
          ))}
        </aside>

        {/* Área del Dashboard */}
        <main className="flex-1 flex flex-col gap-4 overflow-hidden h-full">
          {/* Tarjeta de Pregunta Activa */}
          <div className="bg-slate-900/40 p-4 rounded-lg border-l-4 border-orange-500 shrink-0">
            <h3 className="text-orange-500 font-bold text-lg">{consultaActiva.id}</h3>
            <p className="text-slate-200 mt-1 text-sm md:text-base">{consultaActiva.pregunta}</p>
          </div>

          {/* Visualizador del Dashboard */}
          <div className="flex-1 bg-slate-900/20 rounded-xl border border-slate-800/80 overflow-hidden relative flex items-center justify-center">
            
            {consultaActiva.embedUrl ? (
              <>
                {/* Spinner de Carga */}
                {loading && (
                  <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center gap-3 z-10">
                    <div className="w-10 h-10 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin"></div>
                    <p className="text-sm text-slate-400">Cargando visualización...</p>
                  </div>
                )}
                
                {/* Iframe de Power BI */}
                <iframe
                  title={consultaActiva.id}
                  className="w-full h-full border-none"
                  src={consultaActiva.embedUrl}
                  allowFullScreen={true}
                  onLoad={() => setLoading(false)}
                ></iframe>
              </>
            ) : (
              /* Mensaje cuando el dashboard aún no está conectado */
              <div className="text-slate-500 flex flex-col items-center gap-3 p-8 text-center max-w-md">
                <svg className="w-16 h-16 text-slate-600 stroke-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                <div>
                  <h4 className="text-slate-300 font-semibold text-base">Dashboard no conectado</h4>
                  <p className="text-sm text-slate-500 mt-1">
                    Inserta la URL pública de Power BI en el campo <code className="text-orange-400 bg-slate-950/80 px-1.5 py-0.5 rounded">embedUrl</code> de la consulta <strong className="text-slate-400">{consultaActiva.id}</strong> para visualizar los datos.
                  </p>
                </div>
              </div>
            )}
            
          </div>
        </main>

      </div>
    </div>
  );
};

export default ConsultasAnaliticas;
