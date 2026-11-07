import { Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { TarjetaCurso } from "../components/cursos/TarjetaCurso";
import { Boton } from "../components/ui/Boton";
import { EncabezadoPagina } from "../components/ui/EncabezadoPagina";

import { useApi } from "../hooks/useApi";
import { cursosService } from "../services/cursos";
import { useAuthStore } from "../store/useAuthStore";
import type { Curso } from "../types/curso";

export function CursosPage() {
  const [busqueda, setBusqueda] = useState("");

  const token = useAuthStore((state) => state.token);

  // Indicamos explícitamente que la API devuelve una lista de cursos.
  const {
    data: cursos,
    cargando,
    error,
    recargar,
  } = useApi<Curso[]>(() => cursosService.getTodos());

  const cursosFiltrados = (cursos ?? []).filter((curso) => {
    const consulta = busqueda.trim().toLocaleLowerCase();

    const nombreDocente =
      `${curso.docente.nombre} ${curso.docente.apellido}`;

    return (
      curso.nombre.toLocaleLowerCase().includes(consulta) ||
      curso.codigo.toLocaleLowerCase().includes(consulta) ||
      nombreDocente.toLocaleLowerCase().includes(consulta)
    );
  });

  return (
    <section className="py-2">
      <EncabezadoPagina
        titulo="Explora nuestros cursos"
        descripcion="Encuentra el próximo curso para avanzar hacia tus metas."
      />

      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-md">
          <Search
            size={18}
            className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />

          <input
            value={busqueda}
            onChange={(event) => setBusqueda(event.target.value)}
            placeholder="Buscar curso o docente..."
            aria-label="Buscar curso o docente"
            className="w-full rounded-full border border-slate-200 bg-white py-3 pr-4 pl-10 text-sm shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <p className="text-sm text-slate-500">
          {cursos?.length ?? 0} cursos disponibles
        </p>
      </div>

      {cargando && (
        <div
          role="status"
          className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center text-slate-600 shadow-sm"
        >
          <span className="mx-auto mb-4 block h-9 w-9 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
          Cargando...
        </div>
      )}

      {!cargando && error && (
        <div
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center"
        >
          <h2 className="text-lg font-semibold text-red-900">
            No pudimos cargar los cursos
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-sm text-red-700">
            {error}
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Boton onClick={recargar}>Reintentar</Boton>

            {!token && (
              <Link
                to="/login"
                className="inline-flex items-center rounded-lg border border-blue-200 bg-white px-4 py-2.5 text-sm font-semibold text-blue-700 hover:bg-blue-50"
              >
                Iniciar sesión
              </Link>
            )}
          </div>
        </div>
      )}

      {!cargando && !error && cursos?.length === 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-marca-900">
            Todavía no hay cursos disponibles
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Vuelve pronto para ver nuevas opciones de aprendizaje.
          </p>
        </div>
      )}

      {!cargando && !error && cursos && cursos.length > 0 && (
        cursosFiltrados.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {cursosFiltrados.map((curso) => (
              <TarjetaCurso key={curso.id} curso={curso} />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center text-slate-500">
            No encontramos cursos que coincidan con “{busqueda}”.
          </p>
        )
      )}
    </section>
  );
}