import axios, { AxiosError } from "axios";

export const getAlunoPorId = async (id: string): Promise<any> => {
	try {
		const response = await axios.get('http://localhost:3000/alunos/' + id);
        return response.data;
	} catch (err) {
		const error = err as AxiosError<{ message?: string }>;
		const msg = error.response?.data?.message ?? 'Erro ao adicionar aluno.';
		throw new Error(msg);
	}
};
