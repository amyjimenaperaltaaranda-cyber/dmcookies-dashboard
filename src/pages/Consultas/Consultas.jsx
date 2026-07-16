import React from 'react';

export default function Consultas() {
  // Reemplaza este enlace con el atributo 'src' que copiaste de tu iframe en Power BI Service
  const powerBiUrl = "TU_ENLACE_SRC_DE_POWER_BI_AQUI";

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Dashboards Analíticos</h1>
        <p style={styles.subtitle}>
          Visualización interactiva y análisis de datos sobre la desinformación de las cookies en el usuario peruano (Periodo 2021–2026).
        </p>
      </header>

      {/* Contenedor del Dashboard */}
      <section style={styles.dashboardSection}>
        <div style={styles.dashboardWrapper}>
          <iframe
            title="Visualización de Cookies - Power BI"
            src={powerBiUrl}
            style={styles.iframe}
            allowFullScreen={true}
          />
        </div>
      </section>

      {/* Sección informativa o de navegación para tus Consultas Analíticas (CA1 a CA11) */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>
          Utiliza los filtros interactivos del reporte para explorar las dimensiones técnicas e índices de búsqueda de las consultas analíticas de la investigación.
        </p>
      </footer>
    </div>
  );
}

// Estilos embebidos para mantener el componente autocontenido y responsivo
const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    color: '#333',
  },
  header: {
    marginBottom: '24px',
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#666',
    maxWidth: '800px',
    margin: '0 auto',
    lineHeight: '1.5',
  },
  dashboardSection: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '30px',
  },
  dashboardWrapper: {
    position: 'relative',
    width: '100%',
    paddingBottom: '56.25%', /* Relación de aspecto 16:9 estricta para Power BI */
    height: 0,
    overflow: 'hidden',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e1e1e1',
    backgroundColor: '#f9f9f9',
  },
  iframe: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: 'none',
  },
  footer: {
    textAlign: 'center',
    marginTop: '20px',
    padding: '15px',
    borderTop: '1px solid #eee',
  },
  footerText: {
    fontSize: '0.9rem',
    color: '#777',
    fontStyle: 'italic',
  }
};
