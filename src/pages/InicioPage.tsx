import {
  ArrowRight,
  Award,
  BookOpen,
  Laptop,
  UsersRound,
} from "lucide-react";
import { Link } from "react-router-dom";

const beneficios = [
  {
    icono: BookOpen,
    titulo: "Cursos de calidad",
    descripcion: "Aprende con contenidos actualizados y prácticos.",
  },
  {
    icono: Laptop,
    titulo: "Aprendizaje flexible",
    descripcion: "Estudia a tu ritmo, desde cualquier lugar.",
  },
  {
    icono: Award,
    titulo: "Certificación oficial",
    descripcion: "Valida tus conocimientos con un certificado.",
  },
  {
    icono: UsersRound,
    titulo: "Soporte personalizado",
    descripcion: "Estamos para ayudarte en cada paso.",
  },
];

export function InicioPage() {
  return (
    <div className="relative isolate overflow-hidden">
      <section className="relative flex min-h-[480px] items-center py-12 sm:py-16 lg:min-h-[470px] lg:py-14">
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-[-12%] hidden w-[58%] overflow-hidden lg:block">
          <div className="absolute right-[-7%] top-[-18%] h-[600px] w-[600px] rounded-full bg-blue-100/75" />
          <div className="absolute right-[8%] top-[5%] h-[400px] w-[530px] rounded-[48%] bg-blue-50/95" />
          <div className="absolute right-[27%] top-[22%] h-[290px] w-[390px] rounded-[48%] bg-slate-50/95" />
        </div>

        <div className="relative z-[1] max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
            Tu próximo paso empieza aquí
          </p>
          <h1 className="text-5xl font-extrabold leading-[0.98] tracking-tight text-marca-900 sm:text-6xl lg:text-[5.2rem]">
            Bienvenido a
            <br />
            Academia<span className="text-blue-600">FUNVAL</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
            Tu espacio de aprendizaje, donde el conocimiento te acerca a tus metas.
          </p>
          <Link
            to="/cursos"
            className="mt-7 inline-flex items-center gap-5 rounded-full bg-blue-600 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
          >
            Explorar cursos
            <ArrowRight size={22} />
          </Link>
        </div>
      </section>

      <section className="pb-8 pt-2 sm:pb-10" aria-label="Beneficios de estudiar en Academia FUNVAL">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {beneficios.map(({ icono: Icono, titulo, descripcion }) => (
            <article
              key={titulo}
              className="rounded-xl border border-slate-200 bg-white px-5 py-6 text-center shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-950/5"
            >
              <Icono size={46} strokeWidth={2.2} className="mx-auto text-blue-800" aria-hidden="true" />
              <h2 className="mt-3 text-xl font-bold tracking-tight text-marca-900">
                {titulo}
              </h2>
              <p className="mx-auto mt-2 max-w-[240px] text-base leading-snug text-slate-600">
                {descripcion}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
