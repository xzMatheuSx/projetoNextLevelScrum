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
import { patchPlano } from './edit-plano';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';



const schema = z.object({
    descricao: z.string().nonempty('A descrição é obrigatória'),
    qtdDiasSemana: z.preprocess(
      (val) => Number(val),
      z.number({ invalid_type_error: 'Informe um número' })
        .min(1, 'Quantidade mínima é 1')
    ),
    valor: z.preprocess(
      (val) => Number(val),
      z.number({ invalid_type_error: 'Informe um número' })
        .min(0, 'O valor deve ser maior ou igual a zero')
    ),
});

type FormData = z.infer<typeof schema>;

interface FormsEditPlanosProps {
	planoId: number;
	initialData: FormData;
	onSave: () => void;
}
export default function FormsEditPlanos({ planoId, initialData, onSave }: FormsEditPlanosProps) {
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

	const handleCloseDialog = () => {
		setDialogOpen(false);
		reset(initialData);
	};

	const handleOpenDialog = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setDialogOpen(true);
	};

	const onSubmit = async (data: FormData) => {

		try {
			await patchPlano(data, planoId);
			toast.success('Plano atualizado com sucesso!');
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
			<DropdownMenuItem asChild>
				<button
					type="button"
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();

						setTimeout(() => setDialogOpen(true), 0);
					}}
					className="w-full text-left text-white cursor-pointer"
				>
					Editar
				</button>
			</DropdownMenuItem>
			<Dialog open={isDialogOpen} onOpenChange={setDialogOpen} modal>

                <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}
					className="sm:max-w-[425px] bg-[#1a1a1a] border border-[#2A2A2A]"
					onClick={(e) => e.stopPropagation()}
					onKeyDown={preventSpaceClose}
				>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>Editar Plano</DialogTitle>
                            <DialogDescription>Preencha os detalhes do plano e clique em "Editar Plano".</DialogDescription>
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
                                            className={cn('bg-[#1F1F1F] border-1 text-white', errors.descricao ? 'border-red-400' : 'border-[#2A2A2A]')}
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
                                            className={cn(
                                                'bg-[#1F1F1F] border-1 text-white',
                                                errors.valor ? 'border-red-400' : 'border-[#2A2A2A]'
                                            )}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <Separator className="my-5" />
                        <DialogFooter>
                            <Button type="submit" className="bg-[#006FEE] text-white">
								Editar Plano
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}
