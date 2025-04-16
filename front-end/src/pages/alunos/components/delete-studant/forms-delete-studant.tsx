import * as React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { DeleteUser } from './delete-studant';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';

interface FormsDeleteUserProps {
	userMatricula: string;
	onDelete: () => void;
}

export default function FormsDeleteStudant({ userMatricula: userId, onDelete }: FormsDeleteUserProps) {
	const [isOpen, setIsOpen] = React.useState(false);

	const handleOpen = (event: React.MouseEvent) => {
		event.preventDefault();
		setIsOpen(true);
	};

	const handleClose = () => setIsOpen(false);

	const handleDelete = async () => {
		try {
			await DeleteUser(userId);
			toast.success('Usuário desativado com sucesso!');
			onDelete();
			handleClose();
		} catch (error: unknown) {
			const message = error instanceof Error ? error.message : 'Erro desconhecido ao deletar usuário.';
			toast.error(message);
		}
	};

	return (
		<>
			<DropdownMenuItem className="text-white cursor-pointer" onClick={handleOpen}>
				Desativar Aluno
			</DropdownMenuItem>

			<Dialog open={isOpen} onOpenChange={setIsOpen} modal>
				<DialogContent className="sm:max-w-[425px] bg-[#1a1a1a] border border-[#2A2A2A]">
					<DialogHeader>
						<DialogTitle>Desativar Aluno</DialogTitle>
					</DialogHeader>

					<DialogDescription>Tem certeza que deseja Desativar este usuário? Esta ação não pode ser desfeita.</DialogDescription>

					<DialogFooter>
						<Button onClick={handleClose} className="bg-gray-500 text-white">
							Cancelar
						</Button>
						<Button onClick={handleDelete} className="bg-red-500 text-white">
							Desativar Aluno
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
