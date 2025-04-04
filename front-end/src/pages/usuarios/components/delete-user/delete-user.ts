import axios, { AxiosError } from 'axios';

export const DeleteUser = async (userId: string): Promise<void> => {
	try {
		await axios.delete(`http://localhost:3000/usuarios/${userId}`);
	} catch (err) {
		const error = err as AxiosError<{ message?: string }>;
		const errorMessage = error.response?.data?.message ?? 'Erro ao deletar usuário.';
		throw new Error(errorMessage);
	}
};
