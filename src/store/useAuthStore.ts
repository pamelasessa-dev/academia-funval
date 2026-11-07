
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Usuario } from "../types/usuario";

interface AuthState {
  token: string | null;
  usuario: Usuario | null;

  iniciarSesion: (token: string, usuario: Usuario) => void;
  actualizarUsuario: (usuario: Usuario) => void;
  cerrarSesion: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      usuario: null,

      iniciarSesion: (token, usuario) =>
        set({ token, usuario }),

      // Actualiza los datos del usuario, incluida su foto.
      actualizarUsuario: (usuario) =>
        set({ usuario }),

      cerrarSesion: () =>
        set({ token: null, usuario: null }),
    }),
    {
      name: "academia-funval-sesion",
    },
  ),
);
