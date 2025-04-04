import * as React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { deleteUser } from './delete-user';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import axios from 'axios';

interface FormsDeleteUserProps {
	userId: string;
	onDelete: () => void;
}

export default function FormsDeleteUser({ userId, onDelete }: FormsDeleteUserProps) {
	const [isDialogOpen, setDialogOpen] = React.useState(false);

	const openDialog = (event: React.MouseEvent) => {
		event.preventDefault();
		setDialogOpen(true);
	};

	const closeDialog = () => {
		setDialogOpen(false);
	};

	const handleDelete = async () => {
		try {
			await deleteUser(userId);
			toast.success('Usuário deletado com sucesso!');
			onDelete();
			closeDialog();
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				toast.error(`Erro ao deletar usuário: ${error.response?.data?.message || error.message}`);
			} else {
				toast.error('Erro ao deletar usuário');
			}
		}
	};

	return (
		<>
			<DropdownMenuItem className="text-white cursor-pointer" onClick={openDialog}>
				Deletar Usuário
			</DropdownMenuItem>
			<Dialog open={isDialogOpen} onOpenChange={(isOpen) => setDialogOpen(isOpen)} modal>
				<DialogContent className="sm:max-w-[425px] bg-[#1a1a1a] border-1 border-[#2A2A2A]">
					<DialogHeader>
						<DialogTitle>Deletar Usuário</DialogTitle>
					</DialogHeader>

					<DialogDescription>Tem certeza que deseja deletar este usuário? Esta ação não pode ser desfeita.</DialogDescription>
					<DialogFooter>
						<Button onClick={closeDialog} className="bg-gray-500 text-white">
							Cancelar
						</Button>
						<Button onClick={handleDelete} className="bg-red-500 text-white">
							Deletar
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
