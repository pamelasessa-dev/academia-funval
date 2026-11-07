
import { ChevronDown, GraduationCap, LogOut } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { useAuthStore } from "../../store/useAuthStore";
import { Avatar } from "../ui/Avatar";

const enlaces = [
  { to: "/inicio", texto: "Inicio" },
  { to: "/cursos", texto: "Cursos" },
  { to: "/perfil", texto: "Perfil" },
];

export function BarraSuperior() {
  const navigate = useNavigate();

  const token = useAuthStore((state) => state.token);
  const usuario = useAuthStore((state) => state.usuario);
  const cerrarSesion = useAuthStore((state) => state.cerrarSesion);

  const salir = () => {
    cerrarSesion();
    navigate("/inicio");
  };

  return (
    <header className="relative z-10 bg-marca-900 text-white shadow-lg shadow-slate-950/10">

      <div className="mx-auto flex min-h-[76px] max-w-[1440px] items-center justify-between gap-6 px-5 py-3 sm:px-8 lg:px-12">

        {/* LOGO */}
        <Link
          to="/inicio"
          className="flex shrink-0 items-center gap-3"
          aria-label="Academia FUNVAL, inicio"
        >
          <GraduationCap
            size={43}
            strokeWidth={2.4}
            className="text-white"
          />

          <span className="text-xl font-bold tracking-tight sm:text-2xl">
            Academia<span className="text-blue-400">FUNVAL</span>
          </span>
        </Link>

        {/* NAVEGACIÓN */}
        <nav
          className="flex items-center gap-4 sm:gap-8 lg:gap-12"
          aria-label="Navegación principal"
        >

          {enlaces.map(({ to, texto }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `relative hidden px-1 py-3 text-sm font-medium transition-colors hover:text-blue-300 sm:inline-flex sm:text-base ${
                  isActive
                    ? "text-white after:absolute after:right-0 after:bottom-0 after:left-0 after:h-[3px] after:rounded-full after:bg-blue-500"
                    : "text-slate-200"
                }`
              }
            >
              {texto}
            </NavLink>
          ))}

          {token ? (

            <div className="flex items-center gap-2">

              {/* PERFIL CON FOTO */}
              <Link
                to="/perfil"
                className="flex items-center gap-2 rounded-full p-1.5 text-slate-100 transition hover:bg-white/10 hover:text-white"
                aria-label={`Perfil de ${usuario?.nombre ?? "estudiante"}`}
              >

                {usuario && (
                  <Avatar
                    nombre={usuario.nombre}
                    fotoUrl={usuario.fotoUrl}
                    tamano="sm"
                  />
                )}

                <span className="hidden max-w-32 truncate text-sm sm:block">
                  {usuario?.nombre}
                </span>

                <ChevronDown
                  size={15}
                  className="hidden sm:block"
                />

              </Link>

              {/* CERRAR SESIÓN */}
              <button
                type="button"
                onClick={salir}
                className="rounded-full p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
                aria-label="Cerrar sesión"
                title="Cerrar sesión"
              >
                <LogOut size={18} />
              </button>

            </div>

          ) : (

            <Link
              to="/login"
              className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Ingresar
            </Link>

          )}

        </nav>
      </div>

      {/* NAVEGACIÓN MÓVIL */}
      <nav
        className="flex justify-center gap-8 border-t border-white/10 px-4 sm:hidden"
        aria-label="Navegación móvil"
      >

        {enlaces.map(({ to, texto }) => (
          <NavLink
            key={to}
            to={to}
            className="py-2.5 text-sm font-medium text-slate-200 hover:text-white"
          >
            {texto}
          </NavLink>
        ))}

        {!token && (
          <Link
            to="/login"
            className="py-2.5 text-sm font-semibold text-blue-300"
          >
            Ingresar
          </Link>
        )}

      </nav>
    </header>
  );
}
