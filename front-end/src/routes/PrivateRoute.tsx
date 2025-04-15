import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoginPage from '@/pages/login';
import { useAuth } from '@/hooks/use-auth';

export default function PrivateRoute() {
	const { user } = useAuth();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(false);
	}, [user]);

	if (loading) return <div>Carregando...</div>;

	return user ? <Outlet /> : <LoginPage />;
}
