import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "./Routes";
import { HomePage } from "./pages/HomePage/HomePage";
import PlanetListPage from "./pages/planet-list";
import { PlanetPage } from "./pages/PlanetPage/PlanetPage";
import { useEffect } from "react";
import {invoke} from '@tauri-apps/api/core';

function App() {
  useEffect(() => {
    invoke('tauri', {cmd: 'create'})
    .then((response: any) => console.log(response))
    .catch((error: any) => console.log(error))

    return () => {
      invoke('tauri', {cmd: 'close'})
      .then((response: any) => console.log(response))
      .catch((error: any) => console.log(error))
    }
  }, [])
  
  return (
    <BrowserRouter basename=''>
      <Routes>
        <Route path={ROUTES.HOME} index element={<HomePage />} />
        <Route path={ROUTES.PLANETS} element={<PlanetListPage />} />
        <Route path={`${ROUTES.PLANETS}/:id`} element={<PlanetPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;