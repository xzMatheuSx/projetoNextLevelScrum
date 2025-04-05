import axios, { AxiosError } from 'axios';
import * as z from 'zod';

export const schema = z.object({
	name: z.string().nonempty('Nome é obrigatório'),
	email: z.string().email('E-mail inválido'),
	documento: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido'),
	telefone: z.string().regex(/^\(\d{2}\) \d{5}-\d{4}$/, 'Telefone inválido'),
	horarioTreino: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Horário inválido'),
	dataVencimento: z.string().refine((val) => {
		const date = new Date(val.split('/').reverse().join('-'));
		return date.getFullYear() >= 1900 && date.getFullYear() <= 2100;
	}, 'Data de vencimento deve estar entre 1900 e 2100'),
	planoContratado: z.string().nonempty('Plano contratado é obrigatório'),
	dataNascimento: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Data de nascimento inválida'),
	responsavel: z.string().optional(),
});

export type FormData = z.infer<typeof schema>;

interface Studant {
	nome: string;
	cpf: string;
	email: string;
	telefone: string;
	diaVencimento: number;
	usuarioAltId: number;
	dataNascimento: string;
	responsavel?: string;
}

export const cleanData = (data: FormData): Studant => {
	const [dia] = data.dataVencimento.split('/');
	return {
		nome: data.name,
		cpf: data.documento,
		email: data.email,
		telefone: data.telefone,
		diaVencimento: parseInt(dia, 10),
		usuarioAltId: 1,
		dataNascimento: new Date(data.dataNascimento.split('/').reverse().join('-')).toISOString(),
		responsavel: data.responsavel,
	};
};

export const postAluno = async (data: FormData): Promise<void> => {
	try {
		const cleaned = cleanData(data);
		await axios.post('http://localhost:3000/alunos', cleaned);
	} catch (err) {
		const error = err as AxiosError<{ message?: string }>;
		const msg = error.response?.data?.message ?? 'Erro ao adicionar aluno.';
		throw new Error(msg);
	}
};
