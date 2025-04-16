import { useAuth } from '@/hooks/use-auth';
import LoginPage from '@/pages/login';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Layout from '@/layout';
import Alunos from '@/pages/alunos';
import Usuarios from '@/pages/usuarios';
import Planos from '@/pages/planos';
import Mensalidades from '@/pages/mensalidades';
import TipoProdutos from '@/pages/tipo-produtos';
import Presenca from '@/pages/presenca';

export default function AppRoutes() {
	const { user, isLoading } = useAuth();

	if (isLoading) return <div>Carregando...</div>;

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={user ? <Navigate to="/alunos" replace /> : <LoginPage />} />
				<Route element={<PrivateRoute />}>
					<Route element={<Layout />}>
						<Route path="/alunos" element={<Alunos />} />
						<Route path="/alunos" element={<Alunos />} />
						<Route path="/usuarios" element={<Usuarios />} />
						<Route path="/planos" element={<Planos />} />
						<Route path="/mensalidade" element={<Mensalidades />} />
						<Route path="/tipo-produtos" element={<TipoProdutos />} />
						<Route path="/mensalidades" element={<Mensalidades />} />
						<Route path="/presenca" element={<Presenca />} />
					</Route>
				</Route>
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</BrowserRouter>
	);
}
