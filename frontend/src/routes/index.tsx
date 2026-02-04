import type { RouteObject } from "react-router-dom";
import Login from "../pages/Login";
import { ROUTES } from "../CONSTANTS/ROUTES";
import Dashboard from "../pages/Dashboard";
import MainLayout from "../components/layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import { MODULES } from "@/types/user.types";
import UserManagement from "@/pages/UserManagement";
import OutwardGatePass from "@/pages/OutwardGatePass";

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
            <OutwardGatePass />
          </ProtectedRoute>
      )
      },
      {
        path: ROUTES.ADMIN.USER_MANAGEMENT,
        element: (
          <ProtectedRoute module={MODULES.ADMIN_PANEL}>
            <UserManagement />
          </ProtectedRoute>
      )
      },
    ]
  },
]