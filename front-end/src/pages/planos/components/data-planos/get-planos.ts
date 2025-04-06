import axios from "axios";

export type PlanoList = {
    id: number;
    descricao: string;
    qtdDiasSemana: number;
    valor: number;
    usuarioAltNome: string;
};

export async function getPlanos() {
	try {
		const response = await axios.get('http://localhost:3000/plano');
		return response.data;
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			const errorMessage = error.response?.data?.message || error.message;
			throw new Error(`Erro ao buscar os planos: ${errorMessage}`);
		} else {
			throw new Error('Erro ao buscar os planos');
		}
	}
}
