import { Boton } from "../components/ui/Boton";

export function NoEncontradaPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <p className="text-7xl font-bold text-marca-600">404</p>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">Página no encontrada</h1>
      <p className="mt-2 text-slate-500">La dirección que buscas no existe o fue movida.</p>
      <a href="/inicio" className="mt-8"><Boton>Volver al inicio</Boton></a>
    </div>
  );
}
