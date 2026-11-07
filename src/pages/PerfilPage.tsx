
import { useRef, useState } from "react";
import { Camera, Lock, Mail, Trash2, User } from "lucide-react";

import { Avatar } from "../components/ui/Avatar";
import { Boton } from "../components/ui/Boton";
import { CampoTexto } from "../components/ui/CampoTexto";
import { EncabezadoPagina } from "../components/ui/EncabezadoPagina";
import { Insignia } from "../components/ui/Insignia";
import { Tarjeta } from "../components/ui/Tarjeta";

import { usuarioActual } from "../data/mock";
import { useAuthStore } from "../store/useAuthStore";

export function PerfilPage() {
  const usuarioStore = useAuthStore((state) => state.usuario);
  const actualizarUsuario = useAuthStore(
    (state) => state.actualizarUsuario
  );

  // Si todavía no hay usuario en sesión, utilizamos el usuario de prueba.
  const usuario = usuarioStore ?? usuarioActual;

  const inputFoto = useRef<HTMLInputElement>(null);

  const [mensaje, setMensaje] = useState("");

  // Seleccionar y guardar una nueva foto.
  const cambiarFoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = event.target.files?.[0];

    if (!archivo) return;

    // Validar que sea una imagen.
    if (!archivo.type.startsWith("image/")) {
      setMensaje("Selecciona un archivo de imagen válido.");
      return;
    }

    // Limitar el tamaño a 2 MB.
    if (archivo.size > 2 * 1024 * 1024) {
      setMensaje("La imagen no puede superar los 2 MB.");
      return;
    }

    const lector = new FileReader();

    lector.onload = () => {
      actualizarUsuario({
        ...usuario,
        fotoUrl: lector.result as string,
      });

      setMensaje("Foto de perfil actualizada correctamente.");
    };

    lector.onerror = () => {
      setMensaje("No se pudo cargar la imagen.");
    };

    lector.readAsDataURL(archivo);

    // Permite volver a seleccionar la misma imagen.
    event.target.value = "";
  };

  // Eliminar la foto actual.
  const eliminarFoto = () => {
    actualizarUsuario({
      ...usuario,
      fotoUrl: null,
    });

    setMensaje("Foto de perfil eliminada.");
  };

  return (
    <>
      <EncabezadoPagina
        titulo="Mi perfil"
        descripcion="Tus datos personales y seguridad de la cuenta."
      />

      <div className="grid gap-6 lg:grid-cols-3">

        {/* FOTO DE PERFIL */}
        <Tarjeta className="p-6 text-center">

          <div className="relative mx-auto w-fit">

            <Avatar
              nombre={usuario.nombre}
              fotoUrl={usuario.fotoUrl}
              tamano="lg"
            />

            {/* Botón de cámara */}
            <button
              type="button"
              onClick={() => inputFoto.current?.click()}
              className="absolute right-0 bottom-0 rounded-full border-2 border-white bg-marca-600 p-2 text-white shadow-md transition hover:bg-marca-700"
              aria-label="Cambiar foto de perfil"
            >
              <Camera size={16} />
            </button>

          </div>

          {/* Input oculto para seleccionar imágenes */}
          <input
            ref={inputFoto}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={cambiarFoto}
          />

          <h2 className="mt-4 font-semibold text-slate-900">
            {usuario.nombre}
          </h2>

          <p className="text-sm text-slate-500">
            {usuario.email}
          </p>

          <div className="mt-3">
            <Insignia color="azul">
              {usuario.rol}
            </Insignia>
          </div>

          {/* Mensajes */}
          {mensaje && (
            <p className="mt-4 text-sm text-marca-700">
              {mensaje}
            </p>
          )}

          {/* Acciones */}
          <div className="mt-6 flex flex-col gap-2">

            <Boton
              type="button"
              variante="secundario"
              icono={<Camera size={16} />}
              onClick={() => inputFoto.current?.click()}
            >
              Subir nueva foto
            </Boton>

            {usuario.fotoUrl && (
              <Boton
                type="button"
                variante="peligro"
                icono={<Trash2 size={16} />}
                onClick={eliminarFoto}
              >
                Eliminar foto
              </Boton>
            )}

          </div>
        </Tarjeta>

        <div className="space-y-6 lg:col-span-2">

          {/* DATOS PERSONALES */}
          <Tarjeta className="p-6">

            <h2 className="font-semibold text-slate-900">
              Datos personales
            </h2>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">

              <CampoTexto
                id="nombre"
                etiqueta="Nombre"
                defaultValue={usuario.nombre}
                icono={<User size={18} />}
                disabled
              />

              <CampoTexto
                id="correo"
                etiqueta="Correo"
                defaultValue={usuario.email}
                icono={<Mail size={18} />}
                disabled
              />

            </div>
          </Tarjeta>

          {/* CAMBIAR CONTRASEÑA */}
          <Tarjeta className="p-6">

            <h2 className="font-semibold text-slate-900">
              Cambiar contraseña
            </h2>

            <form className="mt-5 space-y-5">

              <CampoTexto
                id="actual"
                etiqueta="Contraseña actual"
                type="password"
                placeholder="••••••••"
                icono={<Lock size={18} />}
              />

              <div className="grid gap-5 sm:grid-cols-2">

                <CampoTexto
                  id="nueva"
                  etiqueta="Nueva contraseña"
                  type="password"
                  placeholder="••••••••"
                  icono={<Lock size={18} />}
                />

                <CampoTexto
                  id="repetir"
                  etiqueta="Repite la nueva"
                  type="password"
                  placeholder="••••••••"
                  icono={<Lock size={18} />}
                />

              </div>

              <div className="flex justify-end">
                <Boton type="submit">
                  Guardar contraseña
                </Boton>
              </div>

            </form>
          </Tarjeta>

        </div>
      </div>
    </>
  );
}
