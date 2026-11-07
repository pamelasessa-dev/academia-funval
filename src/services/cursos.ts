import { api } from "../lib/axios";
import type { RespuestaApi } from "../types/api";
import type { Curso } from "../types/curso";

type RespuestaCursos = RespuestaApi<Curso[]> | Curso[];

export const cursosService = {
  getTodos: async (): Promise<Curso[]> => {
    const respuesta = await api.get<RespuestaCursos>("/cursos");
    const contenido = respuesta.data;

    if (Array.isArray(contenido)) return contenido;
    if (contenido.success && Array.isArray(contenido.data)) {
      return contenido.data;
    }

    throw new Error("La API no devolvió una lista de cursos válida.");
  },
};
