import axios from 'axios';

export async function EditUser(id: string, data: unknown) {
	try {
		const response = await axios.patch(`http://localhost:3000/usuarios/${id}`, data);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw new Error(`Erro ao atualizar usuário: ${error.response?.data?.message || error.message}`);
		} else {
			throw new Error('Erro ao atualizar usuário');
		}
	}
}
