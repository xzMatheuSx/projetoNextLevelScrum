// routes.tsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/login';
import Alunos from '../pages/alunos';
import Usuarios from '../pages/usuarios';
import Layout from '../layout';
import Planos from '@/pages/planos';
import TipoProdutos from '@/pages/tipo-produtos';
import Mensalidades from '@/pages/mensalidades';
import Presencas from '@/pages/presenca';

export default function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route element={<Layout />}>
					<Route path="/alunos" element={<Alunos />} />
					<Route path="/usuarios" element={<Usuarios />} />
					<Route path="/planos" element={<Planos />} />
					<Route path="/tipo-produtos" element={<TipoProdutos />} />
					<Route path="/mensalidade" element={<Mensalidades />} />
					<Route path="/presenca" element={<Presencas />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
