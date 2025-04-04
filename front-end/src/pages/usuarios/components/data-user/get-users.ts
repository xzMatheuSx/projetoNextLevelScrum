import axios from 'axios';

export async function GetUsers() {
	try {
		const response = await axios.get('http://localhost:3000/usuarios');
		return response.data;
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			const errorMessage = error.response?.data?.message || error.message;
			throw new Error(`Erro ao buscar os usuários: ${errorMessage}`);
		} else {
			throw new Error('Erro ao buscar os usuários');
		}
	}
}
