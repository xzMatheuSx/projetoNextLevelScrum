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

const schema = z.object({
	nome: z.string().nonempty('Nome é obrigatório'),
	usuario: z.string().nonempty('Usuário é obrigatório'),
	email: z.string().email('E-mail inválido').nonempty('E-mail é obrigatório'),
	senha: z
		.string()
		.min(6, 'Senha deve ter no mínimo 10 caracteres')
		.regex(/[!@#$%^&*(),.?":{}|<>]/, 'Senha deve conter ao menos um caractere especial'),
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
		setValue,
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
		setValue('nome', initialData.nome);
		setValue('usuario', initialData.usuario);
		setValue('email', initialData.email);
		setValue('senha', initialData.senha);
	};

	const closeDialog = () => {
		setDialogOpen(false);
		reset();
	};

	const onSubmit = async (data: FormData) => {
		try {
			await editUser(userId, data);
			toast.success('Usuário atualizado com sucesso!');
			onSave();
			closeDialog();
		} catch (error: any) {
			toast.error(`Erro ao atualizar usuário: ${error.message}`);
		}
	};

	React.useEffect(() => {
		(Object.keys(errors) as (keyof FormData)[]).forEach((field) => {
			toast.error(errors[field]?.message as string);
		});
	}, [errors]);

	return (
		<>
			<DropdownMenuItem className="text-white cursor-pointer" onClick={openDialog}>
				Editar Usuário
			</DropdownMenuItem>
			<Dialog open={isDialogOpen} onOpenChange={(isOpen) => setDialogOpen(isOpen)} modal>
				<DialogContent className="sm:max-w-[425px] bg-[#1a1a1a] border-1 border-[#2A2A2A]" onClick={(e) => e.stopPropagation()}>
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
