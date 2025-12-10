import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoadingPage from '@/components/common/LoadingPage';

interface ProtectedRouteProps {
	children: React.ReactNode;
	redirectTo?: string;
}

const ProtectedRoute = ({
	children,
	redirectTo = '/',
}: ProtectedRouteProps) => {
	const { isAuthenticated, loading } = useAuth();

	if (loading) return <LoadingPage />

	return isAuthenticated ? <>{children}</> : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;
