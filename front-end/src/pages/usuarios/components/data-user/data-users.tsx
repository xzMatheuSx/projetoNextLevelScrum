import * as React from 'react';
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
import { GetUsers } from './get-users';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import FormsUsuarios from '../../forms/create-forms-user/formsUser';
import FormsEditUser from '../../forms/edit-user/FormsEditUser';
import FormsDeleteUser from '../delete-user/delete-user-form';

export type Usuario = {
	id: string;
	nome: string;
	usuario: string;
	email: string;
};

export default function DataTableUsers() {
	const [usuarios, setUsuarios] = React.useState<Usuario[]>([]);
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});

	const fetchUsuarios = React.useCallback(async () => {
		try {
			const data = await GetUsers();
			setUsuarios(data);
		} catch (error) {
			console.error('Erro ao buscar os usuários:', error);
		}
	}, []);

	React.useEffect(() => {
		fetchUsuarios();
	}, [fetchUsuarios]);

	const handleSave = async () => {
		await fetchUsuarios();
	};

	const handleDelete = async () => {
		await fetchUsuarios();
	};

	const columns: ColumnDef<Usuario>[] = [
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
			accessorKey: 'nome',
			header: () => <div className="font-bold">Nome</div>,
			cell: ({ row }) => <div className="font-light">{row.getValue('nome')}</div>,
		},

		{
			accessorKey: 'email',
			header: () => <div className="font-bold">E-mail</div>,
			cell: ({ row }) => <div className="font-light">{row.getValue('email')}</div>,
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
							<FormsEditUser
								userId={row.original.id}
								initialData={{
									nome: row.original.nome,
									usuario: row.original.usuario,
									email: row.original.email,
									senha: '',
								}}
								onSave={handleSave}
							/>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem className="bg-red-400/25 hover:bg-red-400">
							<FormsDeleteUser userId={row.original.id} onDelete={handleDelete} />
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			),
		},
	];

	const table = useReactTable({
		data: usuarios,
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
					placeholder="Pesquisar usuários..."
					value={(table.getColumn('nome')?.getFilterValue() as string) ?? ''}
					onChange={(event) => table.getColumn('nome')?.setFilterValue(event.target.value)}
					className="max-w-xl"
				/>
				<div>
					<FormsUsuarios onSave={handleSave} />
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
			{usuarios.length > 13 && (
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
