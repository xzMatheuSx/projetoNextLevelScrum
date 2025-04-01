// routes.tsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/login';
import Alunos from '../pages/alunos';
import Professores from '../pages/professores';
import Layout from '../layout';

export default function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route element={<Layout />}>
					<Route path="/alunos" element={<Alunos />} />
					<Route path="/professores" element={<Professores />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
