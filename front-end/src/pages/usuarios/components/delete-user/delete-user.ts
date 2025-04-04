import axios from 'axios';

export async function DeleteUser(userId: string) {
	try {
		const response = await axios.delete(`http://localhost:3000/usuarios/${userId}`);
		return response.data;
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			const errorMessage = error.response?.data?.message || error.message;
			throw new Error(`Erro ao deletar usuário: ${errorMessage}`);
		} else {
			throw new Error('Erro ao deletar usuário');
		}
	}
}
