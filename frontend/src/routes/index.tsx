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
import AuditLogs from "@/pages/Logs/AuditLogs";
import ErrorLogs from "@/pages/Logs/ErrorLogs";
import DepartmentsHrm from "@/pages/Hrm/DepartmentsHrm";
import DesignationsHrm from "@/pages/Hrm/DesignationsHrm";

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
        path: ROUTES.GATE_PASS.EDIT,
        element: (
          <ProtectedRoute module={MODULES.GATE_PASS_OUT} action={ACTIONS.UPDATE}>
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
          <ProtectedRoute module={MODULES.USER_MANAGEMENT}>
            <UserManagement />
          </ProtectedRoute>
      )
      },
      {
        path: ROUTES.ADMIN.AUDIT_LOGS,
        element: (
          <ProtectedRoute module={MODULES.AUDIT_LOGS}>
            <AuditLogs />
          </ProtectedRoute>
      )
      },
      {
        path: ROUTES.ADMIN.ERROR_LOGS,
        element: (
          <ProtectedRoute module={MODULES.ERROR_LOGS}>
            <ErrorLogs />
          </ProtectedRoute>
      )
      },
      {
        path: ROUTES.HRM.DEPARTMENTS,
        element: (
          <ProtectedRoute module={MODULES.HRM}>
            <DepartmentsHrm />
          </ProtectedRoute>
      )
      },
      {
        path: ROUTES.HRM.DESIGNATIONS,
        element: (
          <ProtectedRoute module={MODULES.HRM}>
            <DesignationsHrm />
          </ProtectedRoute>
      )
      },
    ]
  },
]