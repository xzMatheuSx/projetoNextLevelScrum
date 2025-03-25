import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login';
import Alunos from './pages/alunos';
import Professores from './pages/professores';

export default function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LoginPage />}></Route>
				<Route path="/alunos" element={<Alunos />} />
				<Route path="/professores" element={<Professores />} />
			</Routes>
		</BrowserRouter>
	);
}
