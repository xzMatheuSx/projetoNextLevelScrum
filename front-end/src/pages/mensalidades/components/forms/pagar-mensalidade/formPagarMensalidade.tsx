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
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { pagarMensalidadePost } from './pagar-mensalidade';



const schema = z.object({
    aluno: z.string(),
    valor: z.string(),
    vencimento: z.string()
});

type FormData = z.infer<typeof schema>;

interface FormsPagarMensalidadeProps {
    mensalidade: number;
    initialData: FormData;
    onSave: () => void;
}
export default function FormsPagarMensalidade({ mensalidade, initialData, onSave }: FormsPagarMensalidadeProps) {
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
    const [dataPagamento, setDataPagamento] = React.useState(() => {
        const hoje = new Date();
        const formato = hoje.toISOString().split('T')[0];
        return formato;
      });

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
            await pagarMensalidadePost( 
                {
                    "id": mensalidade,
                    "pago": true,
                    "dataPagamento": dataPagamento
                }
            );
            toast.success('Mensalidade pagar com sucesso!');

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
                    Informar pagamento
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
                            <DialogTitle>Informar pagamento mensalidade</DialogTitle>
                        </DialogHeader>
                        <Separator className="my-5" />
                        <div className="grid gap-4 py-2 grid-cols-2">
                            <div className="col-span-2 grid items-center gap-4">
                                <Label htmlFor="qtdDiasSemana" className="text-right">
                                    Aluno
                                </Label>
                                <Controller
                                    name="aluno"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                        readOnly
                                        {...field}
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
                                            readOnly
                                            {...field}
                                            className={cn(
                                                'bg-[#1F1F1F] border-1 text-white',
                                                errors.valor ? 'border-red-400' : 'border-[#2A2A2A]'
                                            )}
                                        />
                                    )}
                                />
                            </div>

                            <div className="grid items-center gap-2">
                                <Label htmlFor="Vencimento" className="text-right">
                                    Vencimento
                                </Label>
                                <Controller
                                    name="vencimento"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            readOnly
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
                            <div className="grid items-center gap-2">
                                <Label htmlFor="Vencimento" className="text-right">
                                    Data pagamento
                                </Label>
                                        <Input
                                        type="date"
                                        value={dataPagamento}
                                        onChange={(e) => setDataPagamento(e.target.value)}
                                        />
                            
                            </div>
                            <Separator className="my-5" />
                        <DialogFooter>
                            <Button type="submit" className="bg-[#006FEE] text-white">
                                Informar pagamento
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}
