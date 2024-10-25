export const ROUTES = {
    HOME: "/",
    PLANETS: "/Planets",
  }
  export type RouteKeyType = keyof typeof ROUTES;
  export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
    HOME: "Главная",
    PLANETS: "Планеты",
  };