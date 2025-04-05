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
import { EditUser } from './edit-user';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { Eye, EyeOff } from 'lucide-react';

const schema = z.object({
	nome: z
		.string()
		.optional()
		.nullable()
		.refine((val) => !val || val.length > 0, 'Nome é obrigatório'),
	usuario: z
		.string()
		.optional()
		.nullable()
		.refine((val) => !val || val.length > 0, 'Usuário é obrigatório'),
	email: z
		.string()
		.optional()
		.nullable()
		.refine((val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), 'E-mail inválido'),
	senha: z
		.string()
		.optional()
		.nullable()
		.refine(
			(val) => !val || (val.length >= 10 && /[!@#$%^&*(),.?":{}|<>]/.test(val)),
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

	const [isOpen, setIsOpen] = React.useState(false);
	const [showPassword, setShowPassword] = React.useState(false);

	const handleOpenDialog = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsOpen(true);
	};

	const handleCloseDialog = () => {
		setIsOpen(false);
		reset(initialData);
	};

	const onSubmit = async (data: FormData) => {
		// Só envia dados modificados
		const updatedData = Object.fromEntries(Object.entries(data).filter(([key, value]) => value !== initialData[key as keyof FormData]));

		try {
			await EditUser(userId, updatedData);
			toast.success('Usuário atualizado com sucesso!');
			onSave();
			handleCloseDialog();
		} catch (err: unknown) {
			const message = err instanceof Error ? err.message : 'Erro ao atualizar usuário';
			toast.error(message);
		}
	};

	React.useEffect(() => {
		(Object.keys(errors) as (keyof FormData)[]).forEach((field) => {
			toast.error(errors[field]?.message as string);
		});
	}, [errors]);

	const preventSpaceClose = (e: React.KeyboardEvent) => {
		if (e.key === ' ') e.stopPropagation();
	};

	return (
		<>
			<DropdownMenuItem className="text-white cursor-pointer" onClick={handleOpenDialog}>
				Editar Usuário
			</DropdownMenuItem>
			<Dialog open={isOpen} onOpenChange={setIsOpen} modal>
				<DialogContent
					className="sm:max-w-[425px] bg-[#1a1a1a] border border-[#2A2A2A]"
					onClick={(e) => e.stopPropagation()}
					onKeyDown={preventSpaceClose}
				>
					<form onSubmit={handleSubmit(onSubmit)}>
						<DialogHeader>
							<DialogTitle>Editar Usuário</DialogTitle>
							<DialogDescription>Atualize os dados desejados e clique em Salvar.</DialogDescription>
						</DialogHeader>

						<Separator className="my-5" />

						<div className="grid gap-5 py-4 grid-cols-1 sm:grid-cols-2">
							{/* Nome */}
							<div className="grid items-center gap-4">
								<Label htmlFor="nome">Nome</Label>
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

							{/* Usuário */}
							<div className="grid items-center gap-4">
								<Label htmlFor="usuario">Usuário</Label>
								<Controller
									name="usuario"
									control={control}
									render={({ field }) => (
										<Input
											{...field}
											value={field.value ?? ''}
											className={cn('bg-[#1F1F1F] border', errors.usuario ? 'border-red-400' : 'border-[#2A2A2A]')}
										/>
									)}
								/>
							</div>

							{/* Email */}
							<div className="grid items-center gap-4">
								<Label htmlFor="email">E-mail</Label>
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

							{/* Senha */}
							<div className="grid items-center gap-4 relative">
								<Label htmlFor="senha">Senha</Label>
								<Controller
									name="senha"
									control={control}
									render={({ field }) => (
										<div className="relative">
											<Input
												{...field}
												type={showPassword ? 'text' : 'password'}
												value={field.value ?? ''}
												className={cn('bg-[#1F1F1F] border pr-10', errors.senha ? 'border-red-400' : 'border-[#2A2A2A]')}
											/>
											<button
												type="button"
												className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
												onClick={() => setShowPassword((prev) => !prev)}
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
