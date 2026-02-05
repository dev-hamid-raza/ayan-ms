import type { RouteObject } from "react-router-dom";
import Login from "../pages/Login";
import { ROUTES } from "../CONSTANTS/ROUTES";
import Welcome from "../pages/Welcome";
import MainLayout from "../components/layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import { ACTIONS, MODULES } from "@/types/user.types";
import UserManagement from "@/pages/UserManagement";
import OutwardGatePass from "@/pages/OutwardGatePass/OutwardGatePass";
import CreateOGP from "@/pages/OutwardGatePass/CreateOGP";
import Forbidden from "@/pages/Forbidden";
import ViewOGP from "@/pages/OutwardGatePass/ViewOGP";

export const routes: RouteObject[] = [
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: "/403",
    element: <Forbidden />,
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
        element: <Welcome />
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
        path: ROUTES.GATE_PASS.CREATE_OGP,
        element: (
          <ProtectedRoute module={MODULES.GATE_PASS_OUT} action={ACTIONS.CREATE}>
            <CreateOGP />
          </ProtectedRoute>
      )
      },
      {
        path: ROUTES.GATE_PASS.VIEW,
        element: (
          <ProtectedRoute module={MODULES.GATE_PASS_OUT} action={ACTIONS.READ}>
            <ViewOGP />
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