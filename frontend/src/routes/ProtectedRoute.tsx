import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import LoadingPage from "@/components/common/LoadingPage";
import { MODULES } from "@/types/auth.types";

interface ProtectedRouteProps {
	children: React.ReactNode;
	redirectTo?: string;      // if not logged in
	module?: MODULES;         // required permission for this route
	noAccessTo?: string;      // if logged in but no permission
}

const ProtectedRoute = ({
	children,
	redirectTo = "/",
	module,
	noAccessTo = "/403",
}: ProtectedRouteProps) => {
	const { isAuthenticated, loading, user } = useAuth();

	if (loading) return <LoadingPage />;
	if (!isAuthenticated) return <Navigate to={redirectTo} replace />;

	// admin can access all
	if (user.role === "admin") return <>{children}</>;

	// if module is required, check permission
	if (module) {
		const perms = user.permissions ?? [];
		const allowed = perms.some((p) => p.module === module);
		if (!allowed) return <Navigate to={noAccessTo} replace />;
	}

	return <>{children}</>;
};

export default ProtectedRoute;