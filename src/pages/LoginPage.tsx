import { GraduationCap, LockKeyhole, UserRound } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Boton } from "../components/ui/Boton";
import { CampoTexto } from "../components/ui/CampoTexto";
import { authService } from "../services/auth";
import { useAuthStore } from "../store/useAuthStore";
import { mensajeError } from "../lib/errores";

export function LoginPage() {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const iniciarSesion = useAuthStore((state) => state.iniciarSesion);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  if (token) return <Navigate to="/cursos" replace />;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setEnviando(true);

    try {
      const sesion = await authService.login({ username, password });
      iniciarSesion(sesion.token, sesion.usuario);
      navigate("/cursos", { replace: true });
    } catch (err) {
      setError(mensajeError(err, "No se pudo iniciar sesión. Revisa tus datos."));
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section className="mx-auto grid min-h-[620px] max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-marca-900 p-10 text-white lg:flex">
        <div aria-hidden="true" className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-500/20 blur-2xl" />
        <Link to="/inicio" className="relative inline-flex items-center gap-3 text-lg font-bold">
          <GraduationCap size={32} />
          Academia<span className="text-blue-300">FUNVAL</span>
        </Link>
        <div className="relative max-w-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">Tu espacio académico</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight">Aprende y avanza a tu propio ritmo.</h1>
          <p className="mt-4 leading-relaxed text-slate-300">Inicia sesión para explorar cursos y seguir tu progreso en Academia FUNVAL.</p>
        </div>
        <p className="relative text-sm text-slate-400">Aprender hoy, construir un mejor mañana.</p>
      </div>

      <div className="flex items-center px-6 py-10 sm:px-10 lg:px-12">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <GraduationCap size={36} className="text-blue-700" />
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">Bienvenida de nuevo</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-marca-900">Iniciar sesión</h2>
          <p className="mt-2 text-sm text-slate-500">Ingresa con tu usuario y contraseña.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <CampoTexto
              id="username"
              etiqueta="Usuario"
              placeholder="Tu nombre de usuario"
              icono={<UserRound size={17} />}
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
            <CampoTexto
              id="password"
              etiqueta="Contraseña"
              type="password"
              placeholder="••••••••"
              icono={<LockKeyhole size={17} />}
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            {error && (
              <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            )}

            <Boton type="submit" anchoCompleto disabled={enviando} className="rounded-full py-3">
              {enviando ? "Ingresando..." : "Ingresar"}
            </Boton>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            ¿Todavía no tienes cuenta? <Link to="/registro" className="font-semibold text-blue-700 hover:text-blue-800">Crear cuenta</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
