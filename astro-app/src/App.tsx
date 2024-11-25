import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "./Routes";
import { HomePage } from "./pages/HomePage/HomePage";
import PlanetListPage from "./pages/planet-list";
import { PlanetPage } from "./pages/PlanetPage/PlanetPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import ProfilePage from "./pages/ProdilePage/ProfilePage";
import RegPage from "./pages/RegPage/RegPage";
import ConsPage from "./pages/ConsPage/ConsPage";
import ConsTablePage from "./pages/ConsTablePage/ConsTablePage";

function App() {
  return (
    <BrowserRouter basename='/Astro_front'>
      <Routes>
        <Route path={ROUTES.HOME} index element={<HomePage />} />
        <Route path={ROUTES.PLANETS} element={<PlanetListPage />} />
        <Route path={`${ROUTES.PLANETS}/:id`} element={<PlanetPage />} />
        <Route path={ROUTES.AUTH} element={<AuthPage />} />
        <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        <Route path={ROUTES.REGISTER} element={<RegPage />} />
        <Route path={`${ROUTES.CONS}/:id`} element={<ConsPage />} />
        <Route path={ROUTES.CONSTABLE} element={<ConsTablePage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;