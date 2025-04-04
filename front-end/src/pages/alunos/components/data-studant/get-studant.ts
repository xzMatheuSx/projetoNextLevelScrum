import axios, { AxiosError } from 'axios';

export interface Aluno {
	matricula: number;
	nome: string;
	diaVencimento: number;
	ativo: boolean;
}

export const getAlunos = async (): Promise<Aluno[]> => {
	try {
		const response = await axios.get<Aluno[]>('http://localhost:3000/alunos');
		return response.data;
	} catch (err) {
		const error = err as AxiosError<{ message?: string }>;
		const errorMessage = error.response?.data?.message ?? 'Erro ao buscar os alunos.';
		throw new Error(errorMessage);
	}
};
