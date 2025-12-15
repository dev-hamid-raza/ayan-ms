import type { RouteObject } from "react-router-dom";
import Login from "../pages/Login";
import { ROUTES } from "../CONSTANTS/ROUTES";
import Dashboard from "../pages/Dashboard";
import MainLayout from "../components/layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import GatePassOut from "@/pages/GatePassOut";
import { MODULES } from "@/types/auth.types";

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
      },
      {
        path: ROUTES.GATE_PASS.OUT,
        element: (
          <ProtectedRoute module={MODULES.GATE_PASS_OUT}>
            <GatePassOut />
          </ProtectedRoute>
      )
      }
    ]
  },
]