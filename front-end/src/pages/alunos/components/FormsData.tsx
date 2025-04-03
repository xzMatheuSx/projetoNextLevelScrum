import * as React from 'react';
import axios from 'axios';
import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { ArrowLeft, ArrowRight, PencilLine } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import FormsCadastro from './FormsCadastro';

export type Aluno = {
	matricula: number;
	nome: string;
	diaVencimento: number;
	ativo: boolean;
};

export default function DataTableDemo() {
	const [alunos, setAlunos] = React.useState<Aluno[]>([]);
	const [isLoading, setIsLoading] = React.useState<boolean>(true);
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});

	const fetchAlunos = React.useCallback(async () => {
		setIsLoading(true);
		try {
			const response = await axios.get('http://localhost:3000/alunos');
			setAlunos(response.data);
		} catch (error) {
			console.error('Erro ao buscar os alunos:', error);
		} finally {
			setIsLoading(false);
		}
	}, []);

	React.useEffect(() => {
		fetchAlunos();
	}, [fetchAlunos]);

	const columns: ColumnDef<Aluno>[] = [
		{
			id: 'select',
			header: ({ table }) => (
				<Checkbox
					checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
					aria-label="Select all"
				/>
			),
			cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
			enableSorting: false,
			enableHiding: false,
		},
		{
			accessorKey: 'matricula',
			header: () => <div className="font-bold">Matrícula</div>,
			cell: ({ row }) => <div className="font-light">{row.getValue('matricula')}</div>,
		},
		{
			accessorKey: 'nome',
			header: () => <div className="font-bold">Nome</div>,
			cell: ({ row }) => <div className="font-light">{row.getValue('nome')}</div>,
		},
		{
			accessorKey: 'diaVencimento',
			header: () => <div className="font-bold">Dia de Vencimento</div>,
			cell: ({ row }) => <div className="font-light">{row.getValue('diaVencimento')}</div>,
		},
		{
			accessorKey: 'ativo',
			header: () => <div className="font-bold">Ativo</div>,
			cell: ({ row }) => <div className="font-light">{row.getValue('ativo') ? 'Sim' : 'Não'}</div>,
		},
		{
			id: 'actions',
			enableHiding: false,
			cell: ({ row }) => (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Abrir Menu</span>
							<PencilLine />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem>Editar Aluno</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem className="bg-red-400/25 hover:bg-red-400">Excluir aluno</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			),
		},
	];

	const table = useReactTable({
		data: alunos,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
			pagination: {
				pageIndex: 0,
				pageSize: 13,
			},
		},
	});

	return (
		<div className="w-full">
			<div className="flex items-center py-4 justify-between gap-10">
				<Input
					placeholder="Pesquisar alunos..."
					value={(table.getColumn('nome')?.getFilterValue() as string) ?? ''}
					onChange={(event) => table.getColumn('nome')?.setFilterValue(event.target.value)}
					className="max-w-xl"
				/>
				<div>
					<FormsCadastro onSave={fetchAlunos} />
				</div>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow className="bg-[#2A2A2A]" key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{isLoading ? (
							<TableRow>
								<TableCell colSpan={columns.length} className="text-center">
									Carregando...
								</TableCell>
							</TableRow>
						) : (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
									))}
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>
			{alunos.length > 13 && (
				<div className="flex items-center py-4 justify-center gap-5 mr-5 pt-5">
					<Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
						<ArrowLeft />
					</Button>
					<span>
						{table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
					</span>
					<Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
						<ArrowRight />
					</Button>
				</div>
			)}
		</div>
	);
}
