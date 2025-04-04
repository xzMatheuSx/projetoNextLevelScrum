import axios from 'axios';

export async function CreateUser(data: unknown) {
	try {
		const response = await axios.post('http://localhost:3000/usuarios', data);
		return response.data;
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			throw new Error(`Erro ao criar usuário: ${error.response?.data?.message || error.message}`);
		} else {
			throw new Error('Erro ao criar usuário');
		}
	}
}
