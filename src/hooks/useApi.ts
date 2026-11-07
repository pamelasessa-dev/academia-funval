import { useCallback, useEffect, useState } from "react";
import { mensajeError } from "../lib/errores";

export function useApi<T>(
  pedir: () => Promise<T>,
  dependencias: unknown[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actualizacion, setActualizacion] = useState(0);

  // Permite volver a realizar la petición
  const recargar = useCallback(() => {
    setActualizacion((valor) => valor + 1);
  }, []);

  useEffect(() => {
    let activo = true;

    async function cargar() {
      try {
        setCargando(true);
        setError(null);

        const resultado = await pedir();

        if (activo) {
          setData(resultado);
        }
      } catch (err) {
        if (activo) {
          setError(
            mensajeError(err, "Ocurrió un error al cargar los datos")
          );
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    }

    cargar();

    return () => {
      activo = false;
    };

    
  }, [...dependencias, actualizacion]);

  return {
    data,
    cargando,
    error,
    recargar,
  };
}