import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';

export default function PrivateRoute() {
	const { user, isLoading } = useAuth();

	if (isLoading) return <div>Carregando...</div>;

	return user ? <Outlet /> : <Navigate to="/" replace />;
}
