import axios from 'axios';

export async function editUser(id: string, data: unknown) {
	try {
		const response = await axios.patch(`http://localhost:3000/usuarios/${id}`, data);
		return response.data;
	} catch (error) {
		throw new Error('Erro ao atualizar usuário');
	}
}
