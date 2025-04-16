import axios, { AxiosError } from 'axios';
import * as z from 'zod';

export const schema = z.object({
	name: z.string().nonempty('Nome é obrigatório'),
	email: z.string().email('E-mail inválido'),
	documento: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido'),
	telefone: z.string().regex(/^\(\d{2}\) \d{5}-\d{4}$/, 'Telefone inválido'),
	horarioTreino: z
		.string()
		.nonempty('Horário é obrigatório')
		.regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Use o formato HH:MM'),
	dataVencimento: z.string(),
	planoContratado: z.string().nonempty('Plano contratado é obrigatório'),
	dataNascimento: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Data de nascimento inválida'),
	responsavel: z.string().optional(),
	usuarioAlt: z
		.number({
			required_error: 'Usuário responsável é obrigatório',
			invalid_type_error: 'ID deve ser um número',
		})
		.int()
		.positive('ID inválido'),
});

export type FormData = z.infer<typeof schema>;

interface Studant {
	nome: string;
	cpf: string;
	email: string;
	telefone: string;
	diaVencimento: number;
	dataNascimento: string;
	responsavel?: string;
	usuarioAlt: number;
	horarioEstimadoTreino: string;
}

export const cleanData = (data: FormData): Studant => {
	const [dia] = data.dataVencimento.split('/');
	return {
		nome: data.name,
		cpf: data.documento,
		email: data.email,
		telefone: data.telefone,
		diaVencimento: parseInt(dia, 10),
		dataNascimento: new Date(data.dataNascimento.split('/').reverse().join('-')).toISOString(),
		responsavel: data.responsavel,
		usuarioAlt: Number(data.usuarioAlt),
		horarioEstimadoTreino: data.horarioTreino,
	};
};

export const postAluno = async (data: FormData): Promise<void> => {
	try {
		const cleaned = cleanData(data);
		console.log('Dados enviados:', cleaned);
		await axios.post('http://localhost:3000/alunos', cleaned);
	} catch (err) {
		const error = err as AxiosError<{ message?: string }>;
		const msg = error.response?.data?.message ?? 'Erro ao adicionar aluno.';
		throw new Error(msg);
	}
};
