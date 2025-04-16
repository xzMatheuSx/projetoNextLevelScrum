import axios, { AxiosError } from "axios";
import { z } from "zod";

export async function getAlunoPresenca() {
    try {
        const response = await axios.get('http://localhost:3000/aluno-presenca/presentes');
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || error.message;
            throw new Error(`Erro ao buscar os alunos presentes: ${errorMessage}`);
        } else {
            throw new Error('Erro ao buscar os alunos presentes');
        }
    }
}


const schema = z.object({
    alunoMatricula: z.string().nonempty('A matricula do aluno é obrigatória')
});


export type FormData = z.infer<typeof schema>;

export async function getAlunos() {
    try {
        const response = await axios.get('http://localhost:3000/alunos');
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || error.message;
            throw new Error(`Erro ao buscar os alunos presentes: ${errorMessage}`);
        } else {
            throw new Error('Erro ao buscar os alunos presentes');
        }
    }
}

export const registrarEntrada = async (data: FormData): Promise<void> => {
	try {
		await axios.post('http://localhost:3000/aluno-presenca/entrada', data);
	} catch (err) {
		const error = err as AxiosError<{ message?: string }>;
		const msg = error.response?.data?.message ?? 'Erro ao adicionar o plano.';
		throw new Error(msg);
	}
};

export const registrarSaida = async (data: FormData): Promise<void> => {
	try {
		await axios.post('http://localhost:3000/aluno-presenca/saida', data);
	} catch (err) {
		const error = err as AxiosError<{ message?: string }>;
		const msg = error.response?.data?.message ?? 'Erro ao adicionar o plano.';
		throw new Error(msg);
	}
};