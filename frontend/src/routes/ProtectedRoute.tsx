import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import LoadingPage from "@/components/common/LoadingPage";
import { ACTIONS, MODULES, ROLES } from "@/types/user.types";

interface ProtectedRouteProps {
	children: React.ReactNode;
	redirectTo?: string;      // if not logged in
	module?: MODULES;         // required permission for this route
	action?: ACTIONS;         // required action for this route
	noAccessTo?: string;      // if logged in but no permission
}

const ProtectedRoute = ({
	children,
	redirectTo = "/",
	module,
	action,
	noAccessTo = "/403",
}: ProtectedRouteProps) => {
	const { isAuthenticated, loading, user } = useAuth();

	if (loading) return <LoadingPage />;
	if (!isAuthenticated) return <Navigate to={redirectTo} replace />;

	// admin can access all
	if (user.role === ROLES.ADMIN) return <>{children}</>;

	// if module is required, check permission
	if (module) {
		const perms = user.permissions ?? [];
		const hasModule = perms.some((p) => p.module === module);
		if (!hasModule) return <Navigate to={noAccessTo} replace />;

		// if action is also required, check it
		if (action) {
			const hasAction = perms.some((p) => p.module === module && p.actions?.includes(action));
			if (!hasAction) return <Navigate to={noAccessTo} replace />;
		}
	}

	return <>{children}</>;
};

export default ProtectedRoute;