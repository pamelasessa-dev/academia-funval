export interface DocenteCurso {
  id: number;
  username: string;
  nombre: string;
  apellido: string;
  fotoUrl: string | null;
}

/** Curso recibido desde la API. */
export interface Curso {
  id: number;
  codigo: string;
  nombre: string;
  descripcion: string;
  creditos: number;
  cupo: number;
  inscritos: number;
  disponibles: number;
  docente: DocenteCurso;
  createdAt: string;
  updatedAt: string;
}

/** Curso utilizado para los datos de ejemplo. */
export interface CursoEjemplo {
  id: number;
  codigo: string;
  nombre: string;
  descripcion: string;
  docente: string;
  creditos: number;
  cupo: number;
  inscritos: number;
  horario: string;
  categoria: string;
}
