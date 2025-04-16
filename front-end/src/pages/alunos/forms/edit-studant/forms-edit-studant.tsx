import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { cn } from '@/lib/utils';
import { getAlunoPorId } from './get-aluno-por-id';

const schema = z.object({
	nome: z.string().optional().nullable(),
	cpf: z
		.string()
		.optional()
		.nullable()
		.refine((val) => !val || /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(val), 'CPF inválido! O formato correto é 999.999.999-99'),
	email: z
		.string()
		.optional()
		.nullable()
		.refine((val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), 'E-mail inválido'),
	telefone: z
		.string()
		.optional()
		.nullable()
		.refine((val) => !val || /^\(\d{2}\) \d{4,5}-\d{4}$/.test(val), 'Número de telefone inválido! Use o formato (99) 99999-9999.'),
	diaVencimento: z.coerce.number().optional().nullable(),
	usuarioAlt: z.coerce.number().optional().nullable(),
	ativo: z.boolean(),
	dataNascimento: z.coerce.date({ required_error: 'Data de nascimento é obrigatória' }),
	horarioEstimadoTreino: z.string().min(1, 'Horário estimado é obrigatório'),
	responsavel: z.string().min(1, 'Responsável é obrigatório'),
});

type FormData = z.infer<typeof schema>;

interface FormsEditAlunoProps {
	alunoId: string;
	onSave: () => void;
}

export default function FormsEditAluno({ alunoId, onSave }: FormsEditAlunoProps) {
	const [alunoData, setAlunoData] = React.useState<FormData | null>(null);
	const [isOpen, setIsOpen] = React.useState(false);
	const [loading, setLoading] = React.useState(false);

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: alunoData || {},
	});

	const handleOpenDialog = async (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsOpen(true);
		setLoading(true);

		try {
			const data = await getAlunoPorId(alunoId);
			setAlunoData(data);
			console.log(data);
			reset(data);
		} catch (error) {
			toast.error('Erro ao buscar aluno');
		} finally {
			setLoading(false);
		}
	};

	const handleCloseDialog = () => {
		setIsOpen(false);
		setAlunoData(null);
	};

	React.useEffect(() => {
		(Object.keys(errors) as (keyof FormData)[]).forEach((field) => {
			toast.error(errors[field]?.message as string);
		});
	}, [errors]);

	const preventSpaceClose = (e: React.KeyboardEvent) => {
		if (e.key === ' ') e.stopPropagation();
	};

	const onSubmit = async (data: FormData) => {
		const updatedData = Object.fromEntries(Object.entries(data).filter(([key, value]) => value !== initialData[key as keyof FormData]));

		try {
			toast.success('Aluno atualizado com sucesso!');
			onSave();
			handleCloseDialog();
		} catch (err: unknown) {
			const message = err instanceof Error ? err.message : 'Erro ao atualizar aluno';
			toast.error(message);
		}
	};

	React.useEffect(() => {
		(Object.keys(errors) as (keyof FormData)[]).forEach((field) => {
			toast.error(errors[field]?.message as string);
		});
	}, [errors]);

	return (
		<>
			<DropdownMenuItem className="text-white cursor-pointer" onClick={handleOpenDialog}>
				Editar Aluno
			</DropdownMenuItem>
			<Dialog open={isOpen} onOpenChange={setIsOpen} modal>
				<DialogContent
					onOpenAutoFocus={(e) => e.preventDefault()}
					className="sm:max-w-[425px] bg-[#1a1a1a] border border-[#2A2A2A]"
					onClick={(e) => e.stopPropagation()}
					onKeyDown={preventSpaceClose}
				>
					<form onSubmit={handleSubmit(onSubmit)}>
						<DialogHeader>
							<DialogTitle>Editar Aluno</DialogTitle>
							<DialogDescription>Atualize os dados do aluno e clique em Salvar.</DialogDescription>
						</DialogHeader>
						<Separator className="my-5" />
						<div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
							<div className="grid gap-2">
								<Label>Nome</Label>
								<Controller
									name="nome"
									control={control}
									render={({ field }) => (
										<Input
											{...field}
											value={field.value ?? ''}
											className={cn('bg-[#1F1F1F] border', errors.nome ? 'border-red-400' : 'border-[#2A2A2A]')}
										/>
									)}
								/>
							</div>
							<div className="grid gap-2">
								<Label>CPF</Label>
								<Controller
									name="cpf"
									control={control}
									render={({ field }) => (
										<Input
											{...field}
											value={field.value ?? ''}
											className={cn('bg-[#1F1F1F] border', errors.cpf ? 'border-red-400' : 'border-[#2A2A2A]')}
										/>
									)}
								/>
							</div>
							<div className="grid gap-2">
								<Label>Email</Label>
								<Controller
									name="email"
									control={control}
									render={({ field }) => (
										<Input
											{...field}
											type="email"
											value={field.value ?? ''}
											className={cn('bg-[#1F1F1F] border', errors.email ? 'border-red-400' : 'border-[#2A2A2A]')}
										/>
									)}
								/>
							</div>
							<div className="grid gap-2">
								<Label>Telefone</Label>
								<Controller
									name="telefone"
									control={control}
									render={({ field }) => (
										<Input
											{...field}
											value={field.value ?? ''}
											className={cn('bg-[#1F1F1F] border', errors.telefone ? 'border-red-400' : 'border-[#2A2A2A]')}
										/>
									)}
								/>
							</div>
							<div className="grid gap-2">
								<Label>Dia Vencimento</Label>
								<Controller
									name="diaVencimento"
									control={control}
									render={({ field }) => (
										<Input
											{...field}
											type="number"
											value={field.value?.toString() ?? ''}
											className={cn('bg-[#1F1F1F] border', errors.diaVencimento ? 'border-red-400' : 'border-[#2A2A2A]')}
										/>
									)}
								/>
							</div>
							<div className="grid gap-2">
								<Label>Data Nascimento</Label>
								<Controller
									name="dataNascimento"
									control={control}
									render={({ field }) => (
										<Input
											{...field}
											type="date"
											value={field.value ? format(new Date(field.value), 'yyyy-MM-dd') : ''}
											onChange={(e) => field.onChange(new Date(e.target.value))}
											className={cn('bg-[#1F1F1F] border', errors.dataNascimento ? 'border-red-400' : 'border-[#2A2A2A]')}
										/>
									)}
								/>
							</div>
							<div className="grid gap-2">
								<Label>Horário Estimado Treino</Label>
								<Controller
									name="horarioEstimadoTreino"
									type="time"
									control={control}
									render={({ field }) => (
										<Input
											{...field}
											value={field.value}
											className={cn(
												'bg-[#1F1F1F] border',
												errors.horarioEstimadoTreino ? 'border-red-400' : 'border-[#2A2A2A]'
											)}
										/>
									)}
								/>
							</div>
							<div className="grid gap-2">
								<Label>Responsável</Label>
								<Controller
									name="responsavel"
									control={control}
									render={({ field }) => (
										<Input
											{...field}
											value={field.value}
											className={cn('bg-[#1F1F1F] border', errors.responsavel ? 'border-red-400' : 'border-[#2A2A2A]')}
										/>
									)}
								/>
							</div>
						</div>
						<Separator className="my-5" />
						<DialogFooter>
							<Button type="submit" className="bg-[#006FEE] text-white">
								Editar
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</>
	);
}
