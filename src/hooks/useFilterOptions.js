import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

export function useFilterOptions() {
  const [anios, setAnios] = useState([]);
  const [regiones, setRegiones] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      const [{ data: tiempoData }, { data: paisData }] = await Promise.all([
        supabase.from('Dim_Tiempo').select('anio'),
        // Usamos el nombre sin acento para evitar errores 400
        supabase.from('Dim_Pais').select('region'),
      ]);

      const uniqueAnios = [...new Set(tiempoData?.map(t => t.anio).filter(Boolean))].sort();
      const uniqueRegiones = [...new Set(paisData?.map(p => p.region).filter(Boolean))].sort();

      setAnios(uniqueAnios);
      setRegiones(uniqueRegiones);
    };
    fetchOptions();
  }, []);

  return { anios, regiones };
}
