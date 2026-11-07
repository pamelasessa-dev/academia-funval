import { ArrowUpRight, UserRound } from "lucide-react";
import type { Curso } from "../../types/curso";
import { BarraProgreso } from "../ui/BarraProgreso";
import { Boton } from "../ui/Boton";
import { Tarjeta } from "../ui/Tarjeta";

interface Props {
  curso: Curso;
}

export function TarjetaCurso({ curso }: Props) {
  const porcentaje =
    curso.cupo > 0
      ? (curso.inscritos / curso.cupo) * 100
      : 0;

  // El docente de la API es un objeto.
  const docente = `${curso.docente.nombre} ${curso.docente.apellido}`.trim();

  return (
    <Tarjeta className="group flex flex-col overflow-hidden rounded-2xl border-slate-200 transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/5">
      <div className="h-1.5 bg-gradient-to-r from-blue-700 via-blue-500 to-sky-400" />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800">
            {curso.creditos} créditos
          </span>

          <span className="rounded-md bg-slate-50 px-2 py-1 font-mono text-xs text-slate-500">
            {curso.codigo}
          </span>
        </div>

        <h2 className="mt-4 text-lg font-bold leading-snug text-marca-900 sm:text-xl">
          {curso.nombre}
        </h2>

        <p className="mt-2 min-h-[3.25rem] text-sm leading-relaxed text-slate-600">
          {curso.descripcion}
        </p>

        <div className="mt-5 flex items-center gap-2.5 border-t border-slate-100 pt-4 text-sm text-slate-600">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600">
            <UserRound size={16} aria-hidden="true" />
          </span>

          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
              Docente
            </p>

            <p className="truncate font-semibold text-slate-700">
              {docente}
            </p>
          </div>
        </div>

        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="font-medium text-slate-500">
              Cupos ocupados
            </span>

            <span className="font-semibold text-slate-700">
              {curso.inscritos} de {curso.cupo}
            </span>
          </div>

          <BarraProgreso valor={porcentaje} />

          <p className="mt-2 text-xs text-slate-500">
            {curso.disponibles}{" "}
            {curso.disponibles === 1
              ? "cupo disponible"
              : "cupos disponibles"}
          </p>
        </div>

        <Boton
          variante="secundario"
          className="mt-6 w-full justify-between rounded-full border-slate-200 px-4 text-blue-800 group-hover:border-blue-200 group-hover:bg-blue-50"
          icono={<ArrowUpRight size={17} />}
        >
          Ver curso
        </Boton>
      </div>
    </Tarjeta>
  );
}