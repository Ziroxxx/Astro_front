import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "./Routes";
import { HomePage } from "./pages/HomePage/HomePage";
import PlanetListPage from "./pages/planet-list";
import { PlanetPage } from "./pages/PlanetPage/PlanetPage";

function App() {
  return (
    <BrowserRouter basename='/Astro_front'>
      <Routes>
        <Route path={ROUTES.HOME} index element={<HomePage />} />
        <Route path={ROUTES.PLANETS} element={<PlanetListPage />} />
        <Route path={`${ROUTES.PLANETS}/:id`} element={<PlanetPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;