import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from '../pages/login';
import Alunos from '../pages/alunos';
import Usuarios from '../pages/usuarios';
import Layout from '../layout';
import Planos from '@/pages/planos';
import TipoProdutos from '@/pages/tipo-produtos';
import Mensalidades from '@/pages/mensalidades';
import PrivateRoute from './PrivateRoute';
import Presenca from '@/pages/presenca';

export default function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route element={<PrivateRoute />}>
					<Route element={<Layout />}>
						<Route path="/alunos" element={<Alunos />} />
						<Route path="/usuarios" element={<Usuarios />} />
						<Route path="/planos" element={<Planos />} />
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
