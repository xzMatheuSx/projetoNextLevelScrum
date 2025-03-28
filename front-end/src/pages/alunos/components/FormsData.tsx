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
	id: string;
	name: string;
	flat: 'Mensal' | 'Diario' | 'Semanal';
	monthlyFee: 'Paga' | 'Proxima do pagamento' | 'Vencida';
	TrainingSchedule: string;
};

export default function DataTableDemo() {
	const [alunos, setAlunos] = React.useState<Aluno[]>([]);
	const [isLoading, setIsLoading] = React.useState<boolean>(true);
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});

	React.useEffect(() => {
		async function fetchAlunos() {
			try {
				const response = await axios.get('/api/alunos');
				setAlunos(response.data);
			} catch (error) {
				console.error('Erro ao buscar os alunos:', error);
			} finally {
				setIsLoading(false);
			}
		}
		fetchAlunos();
	}, []);

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
			accessorKey: 'name',
			header: () => <div className="font-bold">Aluno</div>,
			cell: ({ row }) => <div className="capitalize font-light">{row.getValue('name')}</div>,
		},
		{
			accessorKey: 'flat',
			header: () => <div className="font-bold">Plano</div>,
			cell: ({ row }) => <div className="capitalize font-light">{row.getValue('flat')}</div>,
		},
		{
			accessorKey: 'TrainingSchedule',
			header: () => <div className="font-bold">Horario Treino</div>,
			cell: ({ row }) => <div className="capitalize font-light">{row.getValue('TrainingSchedule')}</div>,
		},
		{
			accessorKey: 'monthlyFee',
			header: () => <div className="font-bold">Mensalidade</div>,
			cell: ({ row }) => <div className="capitalize font-light">{row.getValue('monthlyFee')}</div>,
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
			// pagination: {
			// 	pageIndex: 0,
			// 	pageSize: 14,
			// },
		},
	});

	return (
		<div className="w-full">
			<div className="flex items-center py-4 justify-between gap-10">
				<Input
					placeholder="Pesquisar alunos..."
					value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
					onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
					className="max-w-xl"
				/>
				<div>
					<FormsCadastro />
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
						{table.getRowModel().rows.map((row) => (
							<TableRow key={row.id}>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center  py-4 justify-center gap-5 mr-5 pt-5 ">
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
		</div>
	);
}
