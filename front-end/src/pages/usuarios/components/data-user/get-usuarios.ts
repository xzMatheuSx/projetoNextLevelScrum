import axios from 'axios';

export async function getUsuarios() {
	try {
		const response = await axios.get('http://localhost:3000/usuarios');
		return response.data;
	} catch (error) {
		throw new Error('Erro ao buscar os usuários');
	}
}
