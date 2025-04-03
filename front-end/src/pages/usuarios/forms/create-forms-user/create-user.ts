/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';

export async function createUsuario(data: unknown) {
	try {
		const response = await axios.post('http://localhost:3000/usuarios', data);
		return response.data;
	} catch (error) {
		throw new Error('Erro ao criar usuário');
	}
}
