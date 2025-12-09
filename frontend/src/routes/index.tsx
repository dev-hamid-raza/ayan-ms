import type { RouteObject } from "react-router-dom";
import Login from "../pages/Login";
import { ROUTES } from "../CONSTANTS/ROUTES";
import Dashboard from "../pages/Dashboard";
import MainLayout from "../components/layouts/MainLayout";

export const routes: RouteObject[] = [
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: "/*",
    element: <MainLayout />,
    children: [
      {
        path: ROUTES.DASHBOARD,
        element: <Dashboard />
      }
    ]
  },
]