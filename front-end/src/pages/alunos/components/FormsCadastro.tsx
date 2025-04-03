import * as React from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const schema = z.object({
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

interface FormData {
	name: string;
	email: string;
	documento: string;
	telefone: string;
	horarioTreino: string;
	dataVencimento: string;
	planoContratado: string;
	dataNascimento: string;
	responsavel?: string;
}

interface FormsCadastroProps {
	onSave: () => void;
}

export default function FormsCadastro({ onSave }: FormsCadastroProps) {
	const [isDialogOpen, setDialogOpen] = React.useState(false);
	const openDialog = () => setDialogOpen(true);
	const closeDialog = () => setDialogOpen(false);

	const {
		handleSubmit,
		control,
		setValue,
		formState: { errors },
		trigger,
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			name: '',
			email: '',
			documento: '',
			telefone: '',
			horarioTreino: '',
			dataVencimento: '',
			planoContratado: '',
			dataNascimento: '',
			responsavel: '',
		},
	});

	const dataNascimento = useWatch({ control, name: 'dataNascimento' });
	const age = dataNascimento ? new Date().getFullYear() - new Date(dataNascimento.split('/').reverse().join('-')).getFullYear() : 0;

	const cleanData = (data: FormData) => {
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

	const onSubmit = async (data: FormData) => {
		const result = await trigger();
		if (!result) {
			Object.entries(errors).forEach(([field, error]) => {
				if (error?.message) {
					toast.error(error.message.toString());
				}
			});
			return;
		}

		try {
			const cleanedData = cleanData(data);
			console.log('Enviando para a API:', cleanedData);

			const response = await fetch('http://localhost:3000/alunos', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(cleanedData),
			});

			if (response.status === 201) {
				toast.success('Aluno adicionado com sucesso!');
				closeDialog();
				onSave();
			} else {
				const errorData = await response.json();
				throw new Error(errorData.message || 'Erro ao adicionar aluno');
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.error('Erro ao adicionar aluno:', error);
				toast.error(error.message || 'Erro ao adicionar aluno. Tente novamente.');
			} else {
				console.error('Erro desconhecido:', error);
				toast.error('Erro inesperado ao adicionar aluno.');
			}
		}
	};

	const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let formattedValue = e.target.value.replace(/\D/g, '').slice(0, 11);
		formattedValue = formattedValue.replace(/(\d{3})(\d)/, '$1.$2');
		formattedValue = formattedValue.replace(/(\d{3})(\d)/, '$1.$2');
		formattedValue = formattedValue.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
		setValue('documento', formattedValue);
	};

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let formattedValue = e.target.value.replace(/\D/g, '').slice(0, 11);
		formattedValue = formattedValue.replace(/(\d{2})(\d)/, '($1) $2');
		formattedValue = formattedValue.replace(/(\d{5})(\d)/, '$1-$2');
		setValue('telefone', formattedValue);
	};

	const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
		let value = e.target.value.replace(/\D/g, '').slice(0, 8);
		if (value.length >= 5) {
			value = value.replace(/(\d{2})(\d{2})(\d{1,4})/, '$1/$2/$3');
		} else if (value.length >= 3) {
			value = value.replace(/(\d{2})(\d{1,2})/, '$1/$2');
		}
		field.onChange(value);
	};

	return (
		<>
			<Button className="bg-[#006FEE]/50 hover:bg-[#006FEE] text-white" onClick={openDialog}>
				Adicionar Aluno
			</Button>
			<Dialog open={isDialogOpen} onOpenChange={setDialogOpen} modal>
				<DialogContent className="sm:max-w-[425px] bg-[#1a1a1a] border-1 border-[#2A2A2A]">
					<form onSubmit={handleSubmit(onSubmit)}>
						<DialogHeader>
							<DialogTitle>Adicionar Aluno</DialogTitle>
							<DialogDescription>Preencha os detalhes do aluno e clique em Adicionar Aluno.</DialogDescription>
						</DialogHeader>
						<Separator className="my-5" />
						<h3 className="text-lg font-semibold">Dados Pessoais</h3>
						<div className="grid gap-5 py-4 grid-cols-1 sm:grid-cols-2">
							<div className="grid items-center gap-4">
								<Label htmlFor="name" className="text-right">
									Nome
								</Label>
								<Controller
									name="name"
									control={control}
									render={({ field }) => (
										<Input
											{...field}
											className={cn('bg-[#1F1F1F] border-1 text-white', errors.name ? 'border-red-400' : 'border-[#2A2A2A]')}
										/>
									)}
								/>
							</div>
							<div className="grid items-center gap-4">
								<Label htmlFor="email" className="text-right">
									E-mail
								</Label>
								<Controller
									name="email"
									control={control}
									render={({ field }) => (
										<Input
											{...field}
											type="email"
											className={cn(
												'col-span-3 bg-[#1F1F1F] border-1 text-white',
												errors.email ? 'border-red-400' : 'border-[#2A2A2A]'
											)}
										/>
									)}
								/>
							</div>
							<div className="grid items-center gap-4">
								<Label htmlFor="documento" className="text-right">
									CPF
								</Label>
								<Controller
									name="documento"
									control={control}
									render={({ field }) => (
										<Input
											{...field}
											onChange={handleCPFChange}
											className={cn(
												'bg-[#1F1F1F] border-1 text-white',
												errors.documento ? 'border-red-400' : 'border-[#2A2A2A]'
											)}
										/>
									)}
								/>
							</div>
							<div className="grid items-center gap-4">
								<Label htmlFor="telefone" className="text-right">
									Telefone
								</Label>
								<Controller
									name="telefone"
									control={control}
									render={({ field }) => (
										<Input
											{...field}
											onChange={handlePhoneChange}
											className={cn(
												'bg-[#1F1F1F] border-1 text-white',
												errors.telefone ? 'border-red-400' : 'border-[#2A2A2A]'
											)}
										/>
									)}
								/>
							</div>
							<div className="grid items-center gap-4">
								<Label htmlFor="dataNascimento" className="text-right">
									Data de Nascimento
								</Label>
								<Controller
									name="dataNascimento"
									control={control}
									render={({ field }) => (
										<Input
											{...field}
											placeholder="DD/MM/YYYY"
											value={field.value}
											onChange={(e) => handleDateChange(e, field)}
											className={cn(
												'bg-[#1F1F1F] border-1 text-white',
												errors.dataNascimento ? 'border-red-400' : 'border-[#2A2A2A]'
											)}
										/>
									)}
								/>
							</div>
							{age < 18 && (
								<div className="grid items-center gap-4">
									<Label htmlFor="responsavel" className="text-right">
										Responsável
									</Label>
									<Controller
										name="responsavel"
										control={control}
										render={({ field }) => (
											<Input
												{...field}
												className={cn(
													'bg-[#1F1F1F] border-1 text-white',
													errors.responsavel ? 'border-red-400' : 'border-[#2A2A2A]'
												)}
											/>
										)}
									/>
								</div>
							)}
						</div>
						<Separator className="my-5" />
						<h3 className="text-lg font-semibold">Cadastro Academia</h3>
						<div className="grid gap-5 py-4 grid-cols-1 sm:grid-cols-2">
							<div className="grid items-center gap-4">
								<Label htmlFor="horarioTreino" className="text-right">
									Horário Treino
								</Label>
								<Controller
									name="horarioTreino"
									control={control}
									render={({ field }) => (
										<Input
											{...field}
											placeholder="HH:MM"
											className={cn(
												'bg-[#1F1F1F] border-1 text-white',
												errors.horarioTreino ? 'border-red-400' : 'border-[#2A2A2A]'
											)}
										/>
									)}
								/>
							</div>
							<div className="grid items-center gap-4">
								<Label htmlFor="dataVencimento" className="text-right">
									Data Vencimento
								</Label>
								<Controller
									name="dataVencimento"
									control={control}
									render={({ field }) => (
										<Input
											{...field}
											placeholder="DD/MM/YYYY"
											value={field.value}
											onChange={(e) => handleDateChange(e, field)}
											className={cn(
												'bg-[#1F1F1F] border-1 text-white',
												errors.dataVencimento ? 'border-red-400' : 'border-[#2A2A2A]'
											)}
										/>
									)}
								/>
							</div>
						</div>
						<div className="grid items-center gap-4 pt-3">
							<Label htmlFor="planoContratado" className="text-right">
								Plano contratado
							</Label>
							<Controller
								name="planoContratado"
								control={control}
								render={({ field }) => (
									<Select {...field} onValueChange={(value) => field.onChange(value)}>
										<SelectTrigger
											className={cn(
												'w-full mb-5 bg-[#1F1F1F] border-1 text-white',
												errors.planoContratado ? 'border-red-400' : 'border-[#2A2A2A]'
											)}
										>
											<SelectValue placeholder="Selecione o plano" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="mensal">Mensal</SelectItem>
											<SelectItem value="diario">Diário</SelectItem>
											<SelectItem value="semanal">Semanal</SelectItem>
										</SelectContent>
									</Select>
								)}
							/>
						</div>
						<Separator className="my-5" />
						<DialogFooter>
							<Button type="submit" className="bg-[#006FEE] text-white">
								Adicionar Aluno
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</>
	);
}
