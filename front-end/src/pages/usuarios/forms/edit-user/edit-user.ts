import axios, { AxiosError } from 'axios';

export const EditUser = async (id: string, data: unknown): Promise<void> => {
	try {
		await axios.patch(`http://localhost:3000/usuarios/${id}`, data);
	} catch (err) {
		const error = err as AxiosError<{ message?: string }>;
		const errorMessage = error.response?.data?.message ?? 'Erro ao atualizar usuário.';
		throw new Error(errorMessage);
	}
};
