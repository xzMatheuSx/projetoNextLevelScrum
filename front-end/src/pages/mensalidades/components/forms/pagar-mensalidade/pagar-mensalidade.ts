import axios, { AxiosError } from "axios";

class PagarMensalidadeDTO {
	id!: number
	pago!: boolean
    dataPagamento!: string
}

export const pagarMensalidadePost = async (data: PagarMensalidadeDTO): Promise<void> => {
	try {
		await axios.post('http://localhost:3000/mensalidade', data);
	} catch (err) {
		const error = err as AxiosError<{ message?: string }>;
		const msg = error.response?.data?.message ?? 'Erro ao pagar a mensalidade.';
		throw new Error(msg);
	}
};