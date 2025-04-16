import React from 'react';
import { getPlanos, PlanoList } from './get-planos';
import { ArrowLeft, ArrowRight, PencilLine } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
	VisibilityState,
} from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import FormsEditPlano from '../../forms/edit-plano/FormsEditPlano';
import FormsPlanos from '../../forms/create-plano-forms/create-plano-forms';

export default function DataTablePlanos() {
	const [planosList, setPlanosList] = React.useState<PlanoList[]>([]);
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});

	const fetchPlanos = React.useCallback(async () => {
		try {
			const data = await getPlanos();
			setPlanosList(data);
		} catch (error) {
			console.error('Erro ao buscar os pllanos:', error);
		}
	}, []);

	React.useEffect(() => {
		fetchPlanos();
	}, [fetchPlanos]);

	const handleSave = async () => {
		console.log('AQUIIIIIIIIIII');
		await fetchPlanos();
	};

	const columns: ColumnDef<PlanoList>[] = [
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
			accessorKey: 'descricao',
			header: () => <div className="font-bold">Descrição</div>,
			cell: ({ row }) => <div className="font-light">{row.getValue('descricao')}</div>,
		},
		{
			accessorKey: 'qtdDiasSemana',
			header: () => <div className="font-bold">Quantidade dias semana</div>,
			cell: ({ row }) => <div className="font-light">{row.getValue('qtdDiasSemana')}</div>,
		},
		{
			accessorKey: 'valor',
			header: () => <div className="font-bold">Valor</div>,
			cell: ({ row }) => <div className="font-light">{row.getValue('valor')}</div>,
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
						<DropdownMenuItem>
							<FormsEditPlano
								planoId={row.original.id}
								initialData={{
									descricao: row.original.descricao,
									qtdDiasSemana: row.original.qtdDiasSemana,
									valor: row.original.valor,
								}}
								onSave={handleSave}
							/>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			),
		},
	];

	const table = useReactTable({
		data: planosList,
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
			<h1>Planos</h1>
			<div className="flex items-center py-4 justify-between gap-10">
				<Input
					placeholder="Pesquisar planos..."
					value={(table.getColumn('descricao')?.getFilterValue() as string) ?? ''}
					onChange={(event) => table.getColumn('descricao')?.setFilterValue(event.target.value)}
					className="max-w-xl"
				/>
				<div>
					<FormsPlanos onSave={handleSave} />
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
			{planosList.length > 13 && (
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
