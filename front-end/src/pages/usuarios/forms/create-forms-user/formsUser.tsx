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
import { CreateUser } from './create-user';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';

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

interface FormsUsuarioProps {
	onSave: () => void;
}

export default function FormsUsuario({ onSave }: FormsUsuarioProps) {
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const [isDialogOpen, setDialogOpen] = React.useState(false);
	const [showPassword, setShowPassword] = React.useState(false);

	const openDialog = () => {
		setDialogOpen(true);
	};

	const closeDialog = () => {
		setDialogOpen(false);
		reset();
	};

	const onSubmit = async (data: FormData) => {
		try {
			await CreateUser(data);
			toast.success('Usuário criado com sucesso!');
			onSave();
			closeDialog();
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				toast.error(`Erro ao criar usuário: ${error.response?.data?.message || error.message}`);
			} else {
				toast.error('Erro ao criar usuário');
			}
		}
	};

	React.useEffect(() => {
		(Object.keys(errors) as (keyof FormData)[]).forEach((field) => {
			toast.error(errors[field]?.message as string);
		});
	}, [errors]);

	return (
		<>
			<Button className="bg-[#006FEE]/50 hover:bg-[#006FEE] text-white" onClick={openDialog}>
				Adicionar Usuário
			</Button>
			<Dialog open={isDialogOpen} onOpenChange={setDialogOpen} modal>
				<DialogContent className="sm:max-w-[425px] bg-[#1a1a1a] border-1 border-[#2A2A2A]">
					<form onSubmit={handleSubmit(onSubmit)}>
						<DialogHeader>
							<DialogTitle>Adicionar Usuário</DialogTitle>
							<DialogDescription>Preencha os detalhes do usuário e clique em Adicionar Usuário.</DialogDescription>
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
								Adicionar Usuário
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</>
	);
}
