import axios from "axios";

export type TipoProdutoList = {
    id: number;
    descricao: string;
    vendaAGranel: boolean;
    unidadeMedida: string;
};

export async function getTipoProdutos() {
	try {
		const response = await axios.get('http://localhost:3000/produto-tipo');
		return response.data;
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			const errorMessage = error.response?.data?.message || error.message;
			throw new Error(`Erro ao buscar os tipos de produtos: ${errorMessage}`);
		} else {
			throw new Error('Erro ao buscar os tipos de produto');
		}
	}
}