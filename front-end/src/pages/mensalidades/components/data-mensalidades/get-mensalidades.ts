import axios from "axios";

export type MensalidadeList = {
    aluno: string;
    plano: string;
    valor: string;
    vencimento: string;
    pago: any;
};

export async function getMensalidades(status: string) {
	try {
    const response = await axios.get('http://localhost:3000/mensalidade/vencidas')
    
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
