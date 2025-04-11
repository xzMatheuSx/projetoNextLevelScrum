import axios from "axios";


export async function createTipoProduto(data: unknown) {
	try {
		const response = await axios.post('http://localhost:3000/produto-tipo', data);
		return response.data;
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			throw new Error(`Erro ao criar o tipo de produto: ${error.response?.data?.message || error.message}`);
		} else {
			throw new Error('Erro ao criar o tipo de produto');
		}
	}
}


export type UnidadeMedida = {
    id  : number;
    descricao: string;
};

export async function getTipoProdutos() {
	try {
		const response = await axios.get('http://localhost:3000/produto-tipo/unidade-medida');
		return response.data;
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			const errorMessage = error.response?.data?.message || error.message;
			throw new Error(`Erro ao buscar as unidades de medida dos tipos de produtos: ${errorMessage}`);
		} else {
			throw new Error('Erro ao buscar as unidades de medida dos tipos de produto');
		}
	}
}
