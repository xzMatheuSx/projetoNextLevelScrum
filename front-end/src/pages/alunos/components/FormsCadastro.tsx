import * as React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';

export default function FormsCadastro() {
	const [isDialogOpen, setDialogOpen] = React.useState(false);
	const openDialog = () => setDialogOpen(true);
	const closeDialog = () => setDialogOpen(false);
	const [date, setDate] = React.useState<Date>();

	return (
		<>
			<Button className="bg-[#006FEE]/50 hover:bg-[#006FEE] text-white" onClick={openDialog}>
				Adicionar Aluno
			</Button>
			<Dialog open={isDialogOpen} onOpenChange={setDialogOpen} modal>
				<DialogContent className="sm:max-w-[425px] bg-[#1a1a1a] border-1 border-[#2A2A2A]">
					<DialogHeader>
						<DialogTitle>Adicionar Aluno</DialogTitle>
						<DialogDescription>Preencha os detalhes do aluno e clique em Adicionar Aluno.</DialogDescription>
					</DialogHeader>
					<Separator />
					<div className="grid gap-5 py-4 grid-cols-1 sm:grid-cols-2">
						<div className="grid  items-center gap-4">
							<Label htmlFor="name" className="text-right">
								Nome
							</Label>
							<Input id="name" defaultValue="" className="bg-[#1F1F1F] border-1 border-[#2A2A2A]  text-white" />
						</div>
						<div className="grid  items-center gap-4">
							<Label htmlFor="email" className="text-right">
								E-mail
							</Label>
							<Input id="email" defaultValue="" type="email" className="col-span-3 bg-[#1F1F1F] border-1 border-[#2A2A2A]  text-white" />
						</div>
						<div className="grid  items-center gap-4">
							<Label htmlFor="documento" className="text-right">
								CPF
							</Label>
							<Input id="documento" defaultValue="" className="bg-[#1F1F1F] border-1 border-[#2A2A2A]  text-white" />
						</div>
						<div className="grid  items-center gap-4">
							<Label htmlFor="telefone" className="text-right">
								Telefone
							</Label>
							<Input id="telefone" defaultValue="" className="bg-[#1F1F1F] border-1 border-[#2A2A2A]  text-white" />
						</div>
						<div className="grid  items-center gap-4">
							<Label htmlFor="horarioTreino" className="text-right">
								Horario Treino
							</Label>
							<Input type="time" id="horarioTreino" defaultValue="" className="bg-[#1F1F1F] border-1 border-[#2A2A2A]  text-white" />
						</div>
						<div className="grid  items-center gap-4">
							<Label htmlFor="dataVencimento" className="text-right">
								Data Vencimento
							</Label>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant={'outline'}
										className={cn('w-full justify-start text-left font-normal ', !date && 'text-muted-foreground')}
									>
										<CalendarIcon className="mr-2 h-4 w-4 text-white" />
										{date ? format(date, 'PPP') : <span>Selecione a data</span>}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0">
									<Calendar mode="single" selected={date} onSelect={setDate} />
								</PopoverContent>
							</Popover>
						</div>
					</div>
					<Separator />
					<div className="grid  items-center gap-4 pt-3">
						<Label htmlFor="dataVencimento" className="text-right">
							Plano contratado
						</Label>
					</div>
					<DialogFooter>
						<Button type="submit" onClick={closeDialog} className="bg-[#006FEE] text-white">
							Adicionar Aluno
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
