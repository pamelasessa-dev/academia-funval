import {
  BookOpen,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Star,
  User,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";

// Por ahora los enlaces son <a href="#">. Cuando agreguemos rutas, se cambian por <NavLink>.
const menuPrincipal = [
  { clave: "inicio", texto: "Inicio", icono: LayoutDashboard },
  { clave: "cursos", texto: "Cursos", icono: BookOpen },
  { clave: "inscripciones", texto: "Mis inscripciones", icono: ClipboardList },
  { clave: "calificaciones", texto: "Calificaciones", icono: Star },
  { clave: "perfil", texto: "Mi perfil", icono: User },
];

const menuAdmin = [
  { clave: "estudiantes", texto: "Estudiantes", icono: Users },
];

const claseEnlace = (activo: string, clave: string) =>
  `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    activo === clave
      ? "bg-white/10 text-white"
      : "text-marca-100 hover:bg-white/5 hover:text-white"
  }`;

export function BarraLateral() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col bg-marca-900 lg:flex">
      <div className="flex items-center gap-2.5 px-6 py-5">
        <div className="rounded-lg bg-marca-500 p-1.5 text-white">
          <GraduationCap size={22} />
        </div>
        <div>
          <p className="text-sm font-bold text-white">Academia FUNVAL</p>
          <p className="text-xs text-marca-200">Sistema académico</p>
        </div>
      </div>

      <nav className="flex-1 space-y-6 px-3 py-4">
        <div className="space-y-1">
          {menuPrincipal.map(({ clave, texto, icono: Icono }) => (
            <NavLink
              key={clave}
              to={`/${clave}`}
              className={({ isActive }) =>
                claseEnlace(isActive ? clave : "", clave)
              }
            >
              <Icono size={18} />
              {texto}
            </NavLink>
          ))}
        </div>

        <div>
          <p className="px-3 pb-2 text-xs font-semibold tracking-wider text-marca-200/70 uppercase">
            Administración
          </p>
          {menuAdmin.map(({ clave, texto, icono: Icono }) => (
            <NavLink
              key={clave}
              to={`/${clave}`}
              className={({ isActive }) =>
                claseEnlace(isActive ? clave : "", clave)
              }
            >
              <Icono size={18} />
              {texto}
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="border-t border-white/10 p-3">
        <a
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-marca-100 hover:bg-white/5 hover:text-white"
        >
          <LogOut size={18} />
          Cerrar sesión
        </a>
      </div>
    </aside>
  );
}
