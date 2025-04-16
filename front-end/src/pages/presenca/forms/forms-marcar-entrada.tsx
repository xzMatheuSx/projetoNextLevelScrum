
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import axios from 'axios';
import { getAlunos, registrarEntrada } from '../components/get-alunos-presentes';

const schema = z.object({
    alunoMatricula: z.string().nonempty('A descrição é obrigatória')
});

type FormData = z.infer<typeof schema>;

interface FormsMarcarPresencaProps {
    onSave: () => void;
}

export default function FormsMarcarPresenca({ onSave }: FormsMarcarPresencaProps) {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });
        
    const [isDialogOpen, setDialogOpen] = React.useState(false);
    const [alunosList, setAlunosList] = React.useState<any[]>([]);
    const [open, setOpen] = React.useState(false)
    const [filter, setFilter] = React.useState("")

    const filteredAlunos = alunosList.filter((aluno) =>
        aluno.nome.toLowerCase().includes(filter.toLowerCase())
      )
      
    const openDialog = () => {
        setDialogOpen(true);

        buscaAlunos()
        
    };

    const buscaAlunos = async () => {
        const data = await getAlunos();
        setAlunosList(data);
    }


    const closeDialog = () => {
        setDialogOpen(false);
        reset();
    };

    const onSubmit = async (data: FormData) => {
        try {
            console.log(data)
            await registrarEntrada(data);
            toast.success('Entrada registrada com sucesso!');
            onSave();
            closeDialog();
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                toast.error(`Erro ao registrar a entrada: ${error.response?.data?.message || error.message}`);
            } else {
                toast.error('Erro ao registrar a entrada');
            }
        }
    };

        return (
            <>
                <Button className="bg-[#006FEE]/50 hover:bg-[#006FEE] text-white" onClick={openDialog}>
                    Marcar entrada
                </Button>
                <Dialog open={isDialogOpen} onOpenChange={setDialogOpen} modal>
                    <DialogContent className="sm:max-w-[425px] bg-[#1a1a1a] border-1 border-[#2A2A2A]">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <DialogHeader>
                                <DialogTitle>Registrar entrada do Aluno</DialogTitle>
                            </DialogHeader>
                            <Separator className="my-5" />
                            <div className="grid gap-4 py-2 grid-cols-2">
                                <div className="col-span-2 grid items-center gap-4">
                                <div className="col-span-2 grid items-center gap-2">
  <Label htmlFor="aluno" className="text-right">Aluno</Label>
  <Controller
          name="alunoMatricula"
          control={control}
          render={({ field }) => (
            <div>
              <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Pesquisar aluno"
                className="border p-2 w-full mb-2"
              />
              <select {...field} 
                className="bg-[#1F1F1F] text-white border border-[#333] rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
>
                <option value="">Selecione...</option>
                {filteredAlunos.map((aluno) => (
                  <option key={aluno.matricula} value={aluno.matricula}>
                    {aluno.nome}
                  </option>
                ))}
              </select>
            </div>
          )}
        />
      </div>
                                </div>
                        
                            </div>
                            <Separator className="my-5" />
                            <DialogFooter>
                                <Button type="submit" className="bg-[#006FEE] text-white">
                                    Registrar presença
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </>
        )
}
