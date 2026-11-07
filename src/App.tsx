import { Navigate, Route, Routes } from "react-router-dom";
import { PlantillaApp } from "./components/layout/PlantillaApp";
import { RutaProtegida } from "./components/layout/RutaProtegida";
import { CalificacionesPage } from "./pages/CalificacionesPage";
import { CursoDetallePage } from "./pages/CursoDetallePage";
import { CursosPage } from "./pages/CursosPage";
import { EstudiantesPage } from "./pages/EstudiantesPage";
import { InicioPage } from "./pages/InicioPage";
import { LoginPage } from "./pages/LoginPage";
import { MisInscripcionesPage } from "./pages/MisInscripcionesPage";
import { NoEncontradaPage } from "./pages/NoEncontradaPage";
import { PerfilPage } from "./pages/PerfilPage";
import { RegistroPage } from "./pages/RegistroPage";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registro" element={<RegistroPage />} />
      <Route element={<PlantillaApp />}>
        <Route index element={<InicioPage />} />
        <Route path="inicio" element={<InicioPage />} />
        <Route path="404" element={<NoEncontradaPage />} />
        <Route element={<RutaProtegida />}>
          <Route path="cursos" element={<CursosPage />} />
          <Route path="cursos/:id" element={<CursoDetallePage />} />
          <Route path="inscripciones" element={<MisInscripcionesPage />} />
          <Route path="calificaciones" element={<CalificacionesPage />} />
          <Route path="perfil" element={<PerfilPage />} />
        </Route>
        <Route element={<RutaProtegida roles={["ADMIN"]} />}>
          <Route path="estudiantes" element={<EstudiantesPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
}
