import * as React from 'react';
import { useEffect } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { schema, FormData, postAluno } from './create-studant';

interface FormsCadastroProps {
	onSave: () => void;
}

interface Plano {
	id: number;
	nome: string;
	descricao: string;
}

interface User {
	id: number;
	nome: string;
}

export default function FormsCadastro({ onSave }: FormsCadastroProps) {
	const [isDialogOpen, setDialogOpen] = React.useState(false);
	const [planos, setPlanos] = React.useState<Plano[]>([]);
	const [users, setUsers] = React.useState<User[]>([]);
	const openDialog = () => setDialogOpen(true);
	const closeDialog = () => setDialogOpen(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [planosResponse, usersResponse] = await Promise.all([
					axios.get('http://localhost:3000/plano'),
					axios.get('http://localhost:3000/usuarios'),
				]);
				setPlanos(planosResponse.data);
				setUsers(usersResponse.data);
			} catch (error) {
				toast.error('Erro ao carregar dados');
			}
		};

		if (isDialogOpen) {
			fetchData();
		}
	}, [isDialogOpen]);

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
			usuarioAlt: undefined,
		},
	});

	const dataNascimento = useWatch({ control, name: 'dataNascimento' });
	const age = dataNascimento ? new Date().getFullYear() - new Date(dataNascimento.split('/').reverse().join('-')).getFullYear() : 0;

	const onSubmit = async (data: FormData) => {
		const result = await trigger();
		if (!result) {
			Object.entries(errors).forEach(([, error]) => {
				if (error?.message) toast.error(error.message.toString());
			});
			return;
		}

		try {
			await postAluno(data);
			toast.success('Aluno adicionado com sucesso!');
			closeDialog();
			onSave();
		} catch (error: unknown) {
			if (error instanceof Error) {
				toast.error(error.message || 'Erro ao adicionar aluno.');
			} else {
				toast.error('Erro inesperado ao adicionar aluno.');
			}
		}
	};

	const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let formatted = e.target.value.replace(/\D/g, '').slice(0, 11);
		formatted = formatted.replace(/(\d{3})(\d)/, '$1.$2');
		formatted = formatted.replace(/(\d{3})(\d)/, '$1.$2');
		formatted = formatted.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
		setValue('documento', formatted);
	};

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let formatted = e.target.value.replace(/\D/g, '').slice(0, 11);
		formatted = formatted.replace(/(\d{2})(\d)/, '($1) $2');
		formatted = formatted.replace(/(\d{5})(\d)/, '$1-$2');
		setValue('telefone', formatted);
	};

	const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, field: { onChange: (value: string) => void }) => {
		let value = e.target.value.replace(/\D/g, '').slice(0, 8);
		if (value.length >= 5) {
			value = value.replace(/(\d{2})(\d{2})(\d{1,4})/, '$1/$2/$3');
		} else if (value.length >= 3) {
			value = value.replace(/(\d{2})(\d{1,2})/, '$1/$2');
		}
		field.onChange(value);
	};

	const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>, field: { onChange: (value: string) => void }) => {
		let value = e.target.value.replace(/\D/g, '');
		if (value.length >= 3) {
			value = value.replace(/(\d{2})(\d)/, '$1:$2');
		}
		field.onChange(value.slice(0, 5));
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
								<Label htmlFor="name">Nome</Label>
								<Controller
									name="name"
									control={control}
									render={({ field }) => (
										<Input {...field} className={cn('bg-[#1F1F1F] text-white', errors.name && 'border-red-400')} />
									)}
								/>
							</div>
							<div className="grid items-center gap-4">
								<Label htmlFor="email">E-mail</Label>
								<Controller
									name="email"
									control={control}
									render={({ field }) => (
										<Input {...field} className={cn('bg-[#1F1F1F] text-white', errors.email && 'border-red-400')} />
									)}
								/>
							</div>
							<div className="grid items-center gap-4">
								<Label htmlFor="documento">CPF</Label>
								<Controller
									name="documento"
									control={control}
									render={({ field }) => (
										<Input
											{...field}
											onChange={handleCPFChange}
											className={cn('bg-[#1F1F1F] text-white', errors.documento && 'border-red-400')}
										/>
									)}
								/>
							</div>
							<div className="grid items-center gap-4">
								<Label htmlFor="telefone">Telefone</Label>
								<Controller
									name="telefone"
									control={control}
									render={({ field }) => (
										<Input
											{...field}
											onChange={handlePhoneChange}
											className={cn('bg-[#1F1F1F] text-white', errors.telefone && 'border-red-400')}
										/>
									)}
								/>
							</div>
							<div className="grid items-center gap-4">
								<Label htmlFor="dataNascimento">Data de Nascimento</Label>
								<Controller
									name="dataNascimento"
									control={control}
									render={({ field }) => (
										<Input
											{...field}
											placeholder="DD/MM/YYYY"
											onChange={(e) => handleDateChange(e, field)}
											className={cn('bg-[#1F1F1F] text-white', errors.dataNascimento && 'border-red-400')}
										/>
									)}
								/>
							</div>
							{age < 18 && (
								<div className="grid items-center gap-4">
									<Label htmlFor="responsavel">Responsável</Label>
									<Controller
										name="responsavel"
										control={control}
										render={({ field }) => (
											<Input {...field} className={cn('bg-[#1F1F1F] text-white', errors.responsavel && 'border-red-400')} />
										)}
									/>
								</div>
							)}
						</div>
						<Separator className="my-5" />
						<h3 className="text-lg font-semibold">Cadastro Academia</h3>
						<div className="grid gap-5 py-4 grid-cols-1 sm:grid-cols-2">
							<div className="grid items-center gap-4">
								<Label htmlFor="horarioTreino">Horário Treino</Label>
								<Controller
									name="horarioTreino"
									control={control}
									render={({ field }) => (
										<Input
											{...field}
											placeholder="Ex: 18:00"
											onChange={(e) => handleTimeChange(e, field)}
											className={cn('bg-[#1F1F1F] text-white', errors.horarioTreino && 'border-red-400')}
										/>
									)}
								/>
							</div>
							<div className="grid items-center gap-4">
								<Label htmlFor="dataVencimento">Data de Vencimento</Label>
								<Controller
									name="dataVencimento"
									control={control}
									render={({ field }) => (
										<Input
											{...field}
											placeholder="DD"
											onChange={(e) => handleDateChange(e, field)}
											className={cn('bg-[#1F1F1F] text-white', errors.dataVencimento && 'border-red-400')}
										/>
									)}
								/>
							</div>
						</div>
						<div className="grid items-center gap-4 pt-3 w-full flex-1 ">
							<Label htmlFor="planoContratado">Plano contratado</Label>
							<Controller
								name="planoContratado"
								control={control}
								render={({ field }) => (
									<Select {...field} onValueChange={field.onChange} defaultValue={field.value}>
										<SelectTrigger className={cn('bg-[#1F1F1F] text-white w-full ', errors.planoContratado && 'border-red-400')}>
											<SelectValue placeholder="Escolha o plano" />
										</SelectTrigger>
										<SelectContent>
											{planos.map((plano) => (
												<SelectItem key={plano.id} value={plano.id.toString()}>
													{plano.descricao}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								)}
							/>
							<div className="grid items-center gap-4">
								<Label>Usuário Responsável</Label>
								<Controller
									name="usuarioAlt"
									control={control}
									render={({ field }) => (
										<Select onValueChange={(value) => field.onChange(Number(value))} value={field.value?.toString()}>
											<SelectTrigger className={cn('bg-[#1F1F1F] text-white w-full', errors.usuarioAlt && 'border-red-400')}>
												<SelectValue placeholder="Selecione o usuário responsável" />
											</SelectTrigger>
											<SelectContent>
												{users.map((user) => (
													<SelectItem key={user.id} value={user.id.toString()}>
														{user.nome}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									)}
								/>
							</div>
						</div>

						<DialogFooter className="mt-10">
							<Button type="submit">Adicionar Aluno</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</>
	);
}
