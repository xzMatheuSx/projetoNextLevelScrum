
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
import { getAlunos, registrarEntrada, registrarSaida } from '../components/get-alunos-presentes';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';

interface FormsMarcarSaidaProps {
	matricula: string;
	onSave: () => void;
}

export default function FormsMarcarSaida({ matricula, onSave }: FormsMarcarSaidaProps) {
	const [isOpen, setIsOpen] = React.useState(false);

	const handleOpen = (event: React.MouseEvent) => {
		event.preventDefault();
		setIsOpen(true);
	};

	const handleClose = () => setIsOpen(false);

	const handleDelete = async () => {
		try {
			await registrarSaida({ alunoMatricula: matricula });
			toast.success('Saída marcada com sucesso!');
			onSave();
			handleClose();
		} catch (error: unknown) {
			const message = error instanceof Error ? error.message : 'Erro ao marcar saída';
			toast.error(message);
		}
	};

	return (
		<>
			<DropdownMenuItem className="text-white cursor-pointer" onClick={handleOpen}>
				Marcar saída
			</DropdownMenuItem>

			<Dialog open={isOpen} onOpenChange={setIsOpen} modal>
				<DialogContent className="sm:max-w-[425px] bg-[#1a1a1a] border border-[#2A2A2A]">
					<DialogHeader>
						<DialogTitle>Marcar saída</DialogTitle>
					</DialogHeader>

					<DialogDescription>Tem certeza que deseja marcar a saída deste aluno?</DialogDescription>

					<DialogFooter>
						<Button onClick={handleClose} className="bg-gray-500 text-white">
							Cancelar
						</Button>
						<Button onClick={handleDelete} className="bg-blue-500 text-white">
							Marcar saída
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
