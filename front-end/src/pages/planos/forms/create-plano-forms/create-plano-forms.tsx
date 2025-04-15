import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { postPlano } from './create-plano';
import { toast } from 'sonner';
import axios from 'axios';
import { cn } from '@/lib/utils';

const schema = z.object({
	descricao: z.string().nonempty('A descrição é obrigatória'),
	qtdDiasSemana: z.preprocess((val) => Number(val), z.number({ invalid_type_error: 'Informe um número' }).min(1, 'Quantidade mínima é 1')),
	valor: z.preprocess((val) => Number(val), z.number({ invalid_type_error: 'Informe um número' }).min(0, 'O valor deve ser maior ou igual a zero')),
});

type FormData = z.infer<typeof schema>;

interface FormsPlanosProps {
	onSave: () => void;
}

export default function FormsPlanos({ onSave }: FormsPlanosProps) {
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const [isDialogOpen, setDialogOpen] = React.useState(false);

	const openDialog = () => {
		setDialogOpen(true);
	};

	const closeDialog = () => {
		setDialogOpen(false);
		reset();
	};

	const onSubmit = async (data: FormData) => {
		try {
			await postPlano(data);
			toast.success('Plano criado com sucesso!');
			onSave();
			closeDialog();
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				toast.error(`Erro ao criar plano: ${error.response?.data?.message || error.message}`);
			} else {
				toast.error('Erro ao criar plano');
			}
		}
	};

	return (
		<>
			<Button className="bg-[#006FEE]/50 hover:bg-[#006FEE] text-white" onClick={openDialog}>
				Adicionar Plano
			</Button>
			<Dialog open={isDialogOpen} onOpenChange={setDialogOpen} modal>
				<DialogContent className="sm:max-w-[425px] bg-[#1a1a1a] border-1 border-[#2A2A2A]">
					<form onSubmit={handleSubmit(onSubmit)}>
						<DialogHeader>
							<DialogTitle>Adicionar Plano</DialogTitle>
							<DialogDescription>Preencha os detalhes do plano e clique em "Adicionar Plano".</DialogDescription>
						</DialogHeader>
						<Separator className="my-5" />
						<div className="grid gap-4 py-2 grid-cols-2">
							<div className="col-span-2 grid items-center gap-4">
								<Label htmlFor="descricao" className="text-right">
									Descrição
								</Label>
								<Controller
									name="descricao"
									control={control}
									render={({ field }) => (
										<Input
											{...field}
											className={cn(
												'bg-[#1F1F1F] border-1 text-white',
												errors.descricao ? 'border-red-400' : 'border-[#2A2A2A]'
											)}
										/>
									)}
								/>
							</div>
							<div className="grid items-center gap-2">
								<Label htmlFor="qtdDiasSemana" className="text-right">
									Quantidade dias semana
								</Label>
								<Controller
									name="qtdDiasSemana"
									control={control}
									render={({ field }) => (
										<Input
											type="number"
											{...field}
											className={cn(
												'bg-[#1F1F1F] border-1 text-white',
												errors.qtdDiasSemana ? 'border-red-400' : 'border-[#2A2A2A]'
											)}
										/>
									)}
								/>
							</div>
							<div className="grid items-center gap-2">
								<Label htmlFor="valor" className="text-right">
									Valor (R$)
								</Label>
								<Controller
									name="valor"
									control={control}
									render={({ field }) => (
										<Input
											type="number"
											{...field}
											className={cn('bg-[#1F1F1F] border-1 text-white', errors.valor ? 'border-red-400' : 'border-[#2A2A2A]')}
										/>
									)}
								/>
							</div>
						</div>
						<Separator className="my-5" />
						<DialogFooter>
							<Button type="submit" className="bg-[#006FEE] text-white">
								Adicionar Plano
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</>
	);
}
