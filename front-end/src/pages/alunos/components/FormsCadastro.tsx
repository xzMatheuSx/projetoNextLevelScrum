import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from 'sonner';

const schema = z.object({
	name: z.string().nonempty('Nome é obrigatório'),
	email: z.string().email('E-mail inválido'),
	documento: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido'),
	telefone: z.string().regex(/^\(\d{2}\) \d{5}-\d{4}$/, 'Telefone inválido'),
	horarioTreino: z.string().nonempty('Horário de treino é obrigatório'),
	dataVencimento: z.date({
		required_error: 'Data de vencimento é obrigatória',
		invalid_type_error: 'Data inválida',
	}),
	planoContratado: z.string().nonempty('Plano contratado é obrigatório'),
});

interface FormData {
	name: string;
	email: string;
	documento: string;
	telefone: string;
	horarioTreino: string;
	dataVencimento: Date;
	planoContratado: string;
}

interface FormsCadastroProps {
	onSave: () => void; // Função para ser chamada após salvar os dados
}

export default function FormsCadastro({ onSave }: FormsCadastroProps) {
	const [isDialogOpen, setDialogOpen] = React.useState(false);
	const openDialog = () => setDialogOpen(true);
	const closeDialog = () => setDialogOpen(false);
	const [date, setDate] = React.useState<Date | undefined>();

	const {
		handleSubmit,
		control,
		setValue,
		formState: { errors },
		trigger,
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			name: '',
			email: '',
			documento: '',
			telefone: '',
			horarioTreino: '',
			dataVencimento: new Date(),
			planoContratado: '',
		},
	});

	const cleanData = (data: FormData) => {
		return {
			nome: data.name,
			cpf: data.documento,
			email: data.email,
			telefone: data.telefone,
			diaVencimento: data.dataVencimento.getDate(),
			usuarioAltId: 1,
		};
	};

	const onSubmit = async (data: FormData) => {
		const result = await trigger();
		if (!result) {
			Object.keys(errors).forEach((field) => {
				toast.error(errors[field as keyof FormData]?.message || 'Erro no formulário');
			});
			return;
		}

		try {
			const cleanedData = cleanData(data);
			console.log('Enviando para a API:', cleanedData);

			const response = await fetch('http://localhost:3000/alunos', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(cleanedData),
			});

			if (response.status === 201) {
				toast.success('Aluno adicionado com sucesso!');
				closeDialog();
				onSave(); // Chama a função passada para atualizar a lista de alunos
			} else {
				const errorData = await response.json();
				throw new Error(errorData.message || 'Erro ao adicionar aluno');
			}
		} catch (error: any) {
			console.error('Erro ao adicionar aluno:', error);
			toast.error(error.message || 'Erro ao adicionar aluno. Tente novamente.');
		}
	};

	const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let formattedValue = e.target.value.replace(/\D/g, '').slice(0, 11);
		formattedValue = formattedValue.replace(/(\d{3})(\d)/, '$1.$2');
		formattedValue = formattedValue.replace(/(\d{3})(\d)/, '$1.$2');
		formattedValue = formattedValue.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
		setValue('documento', formattedValue);
	};

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let formattedValue = e.target.value.replace(/\D/g, '').slice(0, 11);
		formattedValue = formattedValue.replace(/(\d{2})(\d)/, '($1) $2');
		formattedValue = formattedValue.replace(/(\d{5})(\d)/, '$1-$2');
		setValue('telefone', formattedValue);
	};

	return (
		<>
			<Button className="bg-[#006FEE]/50 hover:bg-[#006FEE] text-white" onClick={openDialog}>
				Adicionar Aluno
			</Button>
			<Dialog open={isDialogOpen} onOpenChange={setDialogOpen} modal>
				<DialogContent className="sm:max-w-[425px] bg-[#1a1a1a] border-1 border-[#2A2A2A]">
					<form onSubmit={handleSubmit(onSubmit)}>
						<DialogHeader>
							<DialogTitle>Adicionar Aluno</DialogTitle>
							<DialogDescription>Preencha os detalhes do aluno e clique em Adicionar Aluno.</DialogDescription>
						</DialogHeader>
						<Separator className="my-5" />
						<div className="grid gap-5 py-4 grid-cols-1 sm:grid-cols-2">
							<div className="grid items-center gap-4">
								<Label htmlFor="name" className="text-right">
									Nome
								</Label>
								<Controller
									name="name"
									control={control}
									render={({ field }) => (
										<Input
											{...field}
											className={cn('bg-[#1F1F1F] border-1 text-white', errors.name ? 'border-red-400' : 'border-[#2A2A2A]')}
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
											className={cn(
												'col-span-3 bg-[#1F1F1F] border-1 text-white',
												errors.email ? 'border-red-400' : 'border-[#2A2A2A]'
											)}
										/>
									)}
								/>
							</div>
							<div className="grid items-center gap-4">
								<Label htmlFor="documento" className="text-right">
									CPF
								</Label>
								<Controller
									name="documento"
									control={control}
									render={({ field }) => (
										<Input
											{...field}
											onChange={handleCPFChange}
											className={cn(
												'bg-[#1F1F1F] border-1 text-white',
												errors.documento ? 'border-red-400' : 'border-[#2A2A2A]'
											)}
										/>
									)}
								/>
							</div>
							<div className="grid items-center gap-4">
								<Label htmlFor="telefone" className="text-right">
									Telefone
								</Label>
								<Controller
									name="telefone"
									control={control}
									render={({ field }) => (
										<Input
											{...field}
											onChange={handlePhoneChange}
											className={cn(
												'bg-[#1F1F1F] border-1 text-white',
												errors.telefone ? 'border-red-400' : 'border-[#2A2A2A]'
											)}
										/>
									)}
								/>
							</div>
							<div className="grid items-center gap-4">
								<Label htmlFor="horarioTreino" className="text-right">
									Horário Treino
								</Label>
								<Controller
									name="horarioTreino"
									control={control}
									render={({ field }) => (
										<Input
											{...field}
											type="time"
											className={cn(
												'bg-[#1F1F1F] border-1 text-white',
												errors.horarioTreino ? 'border-red-400' : 'border-[#2A2A2A]'
											)}
										/>
									)}
								/>
							</div>
							<div className="grid items-center gap-4">
								<Label htmlFor="dataVencimento" className="text-right">
									Data Vencimento
								</Label>
								<Popover>
									<PopoverTrigger asChild>
										<Button
											variant={'outline'}
											className={cn(
												'w-full justify-start text-left font-normal ',
												!date && 'text-muted-foreground',
												errors.dataVencimento ? 'border-red-400' : 'border-[#2A2A2A]'
											)}
										>
											<CalendarIcon className="mr-2 h-4 w-4 text-white" />
											{date ? format(date, 'dd/MM/yyyy', { locale: ptBR }) : <span>Selecione a data</span>}
										</Button>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0">
										<Calendar mode="single" selected={date} onSelect={(d) => setDate(d || undefined)} locale={ptBR} />
									</PopoverContent>
								</Popover>
							</div>
						</div>
						<div className="grid items-center gap-4 pt-3">
							<Label htmlFor="planoContratado" className="text-right">
								Plano contratado
							</Label>
							<Controller
								name="planoContratado"
								control={control}
								render={({ field }) => (
									<Select {...field} onValueChange={(value) => field.onChange(value)}>
										<SelectTrigger
											className={cn(
												'w-full mb-5 bg-[#1F1F1F] border-1 text-white',
												errors.planoContratado ? 'border-red-400' : 'border-[#2A2A2A]'
											)}
										>
											<SelectValue placeholder="Selecione o plano" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="mensal">Mensal</SelectItem>
											<SelectItem value="diario">Diário</SelectItem>
											<SelectItem value="semanal">Semanal</SelectItem>
										</SelectContent>
									</Select>
								)}
							/>
						</div>
						<Separator className="my-5" />
						<DialogFooter>
							<Button type="submit" className="bg-[#006FEE] text-white">
								Adicionar Aluno
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</>
	);
}
