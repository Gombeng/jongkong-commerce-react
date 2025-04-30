import { Navigate, Outlet, useLocation } from "react-router";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Jongkong Commerce" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}
export default function AuthLayout() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const location = useLocation();

  const publicRoutes = ["/login", "/register"];
  const isPublicRoute = publicRoutes.includes(location.pathname);

  if (!isLoggedIn && !isPublicRoute) {
    return <Navigate to="/login" replace />;
  }

  if (isLoggedIn && isPublicRoute) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
