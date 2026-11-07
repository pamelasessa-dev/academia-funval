import { GraduationCap, Lock, Mail, User } from "lucide-react";
import { Boton } from "../components/ui/Boton";
import { CampoTexto } from "../components/ui/CampoTexto";
import { Tarjeta } from "../components/ui/Tarjeta";

export function RegistroPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-marca-50 to-slate-100 p-6">
      <div className="w-full max-w-md">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="rounded-xl bg-marca-600 p-2.5 text-white">
            <GraduationCap size={28} />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-slate-900">Crea tu cuenta</h1>
          <p className="mt-1 text-sm text-slate-500">El registro crea una cuenta de estudiante.</p>
        </div>

        <Tarjeta className="p-6 sm:p-8">
          <div className="space-y-5">
            <CampoTexto id="nombre" etiqueta="Nombre completo" placeholder="Ana Quispe" icono={<User size={18} />} />
            <CampoTexto
              id="email"
              etiqueta="Correo electrónico"
              type="email"
              placeholder="tu.nombre@funval.org"
              icono={<Mail size={18} />}
            />
            <CampoTexto
              id="password"
              etiqueta="Contraseña"
              type="password"
              placeholder="••••••••"
              icono={<Lock size={18} />}
              ayuda="Mínimo 8 caracteres."
            />
            <CampoTexto
              id="confirmar"
              etiqueta="Repite la contraseña"
              type="password"
              placeholder="••••••••"
              icono={<Lock size={18} />}
            />
            <Boton anchoCompleto disabled>
              Crear cuenta
            </Boton>
          </div>
        </Tarjeta>

        <p className="mt-6 text-center text-sm text-slate-500">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="font-semibold text-marca-600 hover:text-marca-700">
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
}
