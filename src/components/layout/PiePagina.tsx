import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

export function PiePagina() {
  return (
    <footer className="bg-marca-900 text-white">
      <div className="mx-auto grid max-w-[1440px] gap-8 px-6 py-9 sm:px-10 lg:grid-cols-[1.35fr_1fr_0.9fr_1.25fr] lg:items-center lg:gap-0 lg:px-14">
        <div className="lg:pr-8">
          <Link to="/inicio" className="inline-flex items-center gap-3">
            <GraduationCap size={38} strokeWidth={2.3} />
            <span className="text-xl font-bold">Academia<span className="text-blue-400">FUNVAL</span></span>
          </Link>
          <p className="mt-2 text-sm text-slate-200">Aprender hoy, construir un mejor mañana.</p>
        </div>

        <div className="border-t border-white/20 pt-5 lg:border-t-0 lg:border-l lg:px-8 lg:py-1">
          <h2 className="font-semibold">Enlaces útiles</h2>
          <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-200">
            <Link className="hover:text-blue-300" to="/inicio">Inicio</Link>
            <Link className="hover:text-blue-300" to="/cursos">Cursos</Link>
            <Link className="hover:text-blue-300" to="/perfil">Perfil</Link>
          </div>
        </div>

        <div className="border-t border-white/20 pt-5 lg:border-t-0 lg:border-l lg:px-8 lg:py-1">
          <h2 className="font-semibold">Seguinos</h2>
          <div className="mt-2 flex items-center gap-3 text-slate-100" aria-label="Redes sociales">
            {["f", "◎", "▶", "in"].map((marca) => (
              <span key={marca} className="flex h-8 min-w-8 items-center justify-center rounded-full border border-white/25 px-1.5 text-sm font-bold">
                {marca}
              </span>
            ))}
          </div>
        </div>

        <p className="border-t border-white/20 pt-5 text-sm text-slate-200 lg:border-t-0 lg:border-l lg:py-1 lg:pl-8">
          © 2026 Academia FUNVAL. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
