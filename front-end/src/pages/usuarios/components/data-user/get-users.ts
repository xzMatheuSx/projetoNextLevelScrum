import axios, { AxiosError } from 'axios';

export interface Usuario {
	id: string;
	nome: string;
	usuario: string;
	email: string;
}

export const getUsuarios = async (): Promise<Usuario[]> => {
	try {
		const response = await axios.get<Usuario[]>('http://localhost:3000/usuarios');
		return response.data;
	} catch (err) {
		const error = err as AxiosError<{ message?: string }>;
		const errorMessage = error.response?.data?.message ?? 'Erro ao buscar os usuários.';
		throw new Error(errorMessage);
	}
};
