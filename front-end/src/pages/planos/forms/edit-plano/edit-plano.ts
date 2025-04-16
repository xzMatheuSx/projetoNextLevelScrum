import axios, { AxiosError } from 'axios';
import { z } from 'zod';

const schema = z.object({
	descricao: z.string().nonempty('A descrição é obrigatória'),
	qtdDiasSemana: z.preprocess((val) => Number(val), z.number({ invalid_type_error: 'Informe um número' }).min(1, 'Quantidade mínima é 1')),
	valor: z.preprocess((val) => Number(val), z.number({ invalid_type_error: 'Informe um número' }).min(0, 'O valor deve ser maior ou igual a zero')),
});

export type FormData = z.infer<typeof schema>;

export const cleanData = (data: FormData): Plano => {
	return {
		descricao: data.descricao,
		qtdDiasSemana: data.qtdDiasSemana,
		valor: data.valor,
		usuarioAltId: 2,
	};
};

interface Plano {
	descricao: string;
	qtdDiasSemana: number;
	valor: number;
	usuarioAltId: number;
}

export const patchPlano = async (data: FormData, idPlano: number): Promise<void> => {
	try {
		const cleaned = cleanData(data);
		await axios.patch('http://localhost:3000/plano/' + idPlano, cleaned);
	} catch (err) {
		const error = err as AxiosError<{ message?: string }>;
		const msg = error.response?.data?.message ?? 'Erro ao adicionar o plano.';
		throw new Error(msg);
	}
};
