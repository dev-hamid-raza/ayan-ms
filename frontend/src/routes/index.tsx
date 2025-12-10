import type { RouteObject } from "react-router-dom";
import Login from "../pages/Login";
import { ROUTES } from "../CONSTANTS/ROUTES";
import Dashboard from "../pages/Dashboard";
import MainLayout from "../components/layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

export const routes: RouteObject[] = [
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: "/*",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: ROUTES.DASHBOARD,
        element: <Dashboard />
      }
    ]
  },
]