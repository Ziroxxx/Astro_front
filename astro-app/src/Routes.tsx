export const ROUTES = {
    HOME: "/",
    PLANETS: "/Planets",
    AUTH: "/Auth",
    PROFILE: "/Profile",
    REGISTER: "/Register",
    CONS: "/Constellation",
    CONSTABLE: "/ConstellationTable"
  }
  export type RouteKeyType = keyof typeof ROUTES;
  export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
    HOME: "Главная",
    PLANETS: "Планеты",
    AUTH: "Аутентификация",
    PROFILE: "Профиль",
    REGISTER: "Регистрация",
    CONS: "Созвездие",
    CONSTABLE: "Созвездия"
  };