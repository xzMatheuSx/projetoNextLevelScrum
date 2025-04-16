import axios, { AxiosError } from 'axios';

export const DeleteUser = async (userId: string): Promise<void> => {
	try {
		await axios.delete(`http://localhost:3000/alunos/${userId}`);
	} catch (err) {
		const error = err as AxiosError<{ message?: string }>;
		const errorMessage = error.response?.data?.message ?? 'Erro ao deletar aluno.';
		throw new Error(errorMessage);
	}
};
