import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { editUser } from './edit-user';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';

const schema = z.object({
	nome: z
		.string()
		.optional()
		.nullable()
		.refine((value) => !value || value.length > 0, 'Nome é obrigatório'),
	usuario: z
		.string()
		.optional()
		.nullable()
		.refine((value) => !value || value.length > 0, 'Usuário é obrigatório'),
	email: z
		.string()
		.optional()
		.nullable()
		.refine((value) => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), 'E-mail inválido'),
	senha: z
		.string()
		.optional()
		.nullable()
		.refine(
			(value) => !value || (value.length >= 10 && /[!@#$%^&*(),.?":{}|<>]/.test(value)),
			'Senha deve ter no mínimo 10 caracteres e conter ao menos um caractere especial'
		),
});

type FormData = z.infer<typeof schema>;

interface FormsEditUserProps {
	userId: string;
	initialData: FormData;
	onSave: () => void;
}

export default function FormsEditUser({ userId, initialData, onSave }: FormsEditUserProps) {
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: initialData,
	});

	const [isDialogOpen, setDialogOpen] = React.useState(false);
	const [showPassword, setShowPassword] = React.useState(false);

	const openDialog = (event: React.MouseEvent) => {
		event.preventDefault();
		event.stopPropagation();
		setDialogOpen(true);
	};

	const closeDialog = () => {
		setDialogOpen(false);
		reset(initialData);
	};

	const onSubmit = async (data: FormData) => {
		const updatedData = Object.keys(data).reduce((acc, key) => {
			if (data[key as keyof FormData] !== initialData[key as keyof FormData]) {
				acc[key as keyof FormData] = data[key as keyof FormData];
			}
			return acc;
		}, {} as FormData);

		try {
			await editUser(userId, updatedData);
			toast.success('Usuário atualizado com sucesso!');
			onSave();
			closeDialog();
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				toast.error(`Erro ao atualizar usuário: ${error.response?.data?.message || error.message}`);
			} else {
				toast.error('Erro ao atualizar usuário');
			}
		}
	};

	React.useEffect(() => {
		(Object.keys(errors) as (keyof FormData)[]).forEach((field) => {
			toast.error(errors[field]?.message as string);
		});
	}, [errors]);

	const preventSpaceClose = (event: React.KeyboardEvent) => {
		if (event.key === ' ') {
			event.stopPropagation();
		}
	};

	return (
		<>
			<DropdownMenuItem className="text-white cursor-pointer" onClick={openDialog}>
				Editar Usuário
			</DropdownMenuItem>
			<Dialog open={isDialogOpen} onOpenChange={(isOpen) => setDialogOpen(isOpen)} modal>
				<DialogContent
					className="sm:max-w-[425px] bg-[#1a1a1a] border-1 border-[#2A2A2A]"
					onClick={(e) => e.stopPropagation()}
					onKeyDown={preventSpaceClose}
				>
					<form onSubmit={handleSubmit(onSubmit)}>
						<DialogHeader>
							<DialogTitle>Editar Usuário</DialogTitle>
							<DialogDescription>Atualize os detalhes do usuário e clique em Salvar.</DialogDescription>
						</DialogHeader>
						<Separator className="my-5" />
						<div className="grid gap-5 py-4 grid-cols-1 sm:grid-cols-2">
							<div className="grid items-center gap-4">
								<Label htmlFor="nome" className="text-right">
									Nome
								</Label>
								<Controller
									name="nome"
									control={control}
									render={({ field }) => (
										<Input
											{...field}
											value={field.value ?? ''}
											className={cn('bg-[#1F1F1F] border-1 text-white', errors.nome ? 'border-red-400' : 'border-[#2A2A2A]')}
										/>
									)}
								/>
							</div>
							<div className="grid items-center gap-4">
								<Label htmlFor="usuario" className="text-right">
									Usuário
								</Label>
								<Controller
									name="usuario"
									control={control}
									render={({ field }) => (
										<Input
											{...field}
											value={field.value ?? ''}
											className={cn(
												'bg-[#1F1F1F] border-1 text-white',
												errors.usuario ? 'border-red-400' : 'border-[#2A2A2A]'
											)}
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
											value={field.value ?? ''}
											className={cn('bg-[#1F1F1F] border-1 text-white', errors.email ? 'border-red-400' : 'border-[#2A2A2A]')}
										/>
									)}
								/>
							</div>
							<div className="grid items-center gap-4 relative">
								<Label htmlFor="senha" className="text-right">
									Senha
								</Label>
								<Controller
									name="senha"
									control={control}
									render={({ field }) => (
										<div className="relative">
											<Input
												{...field}
												type={showPassword ? 'text' : 'password'}
												value={field.value ?? ''}
												className={cn(
													'bg-[#1F1F1F] border-1 text-white',
													errors.senha ? 'border-red-400' : 'border-[#2A2A2A]'
												)}
											/>
											<button
												type="button"
												className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
												onClick={() => setShowPassword(!showPassword)}
											>
												{showPassword ? <EyeOff /> : <Eye />}
											</button>
										</div>
									)}
								/>
							</div>
						</div>
						<Separator className="my-5" />
						<DialogFooter>
							<Button type="submit" className="bg-[#006FEE] text-white">
								Salvar
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</>
	);
}
