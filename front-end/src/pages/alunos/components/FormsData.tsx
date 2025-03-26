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
import { PencilLine } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

export type Aluno = {
	id: string;
	name: string;
	flat: 'Mensal' | 'Diario' | 'Semanal';
	monthlyFee: 'Paga' | 'Proxima do pagamento' | 'Vencida';
	TrainingSchedule: string;
};

const data: Aluno[] = [
	{
		id: 'm5gr84i9',
		name: 'Emanoel',
		flat: 'Mensal',
		monthlyFee: 'Paga',
		TrainingSchedule: '11:30h até 12:30h',
	},
	{
		id: 'm5gr84i9',
		name: 'Pacheco',
		flat: 'Diario',
		monthlyFee: 'Vencida',
		TrainingSchedule: '11:30h até 12:30h',
	},
	{
		id: 'm5gr84i9',
		name: 'Polaco',
		flat: 'Semanal',
		monthlyFee: 'Proxima do pagamento',
		TrainingSchedule: '11:30h até 12:30h',
	},
];

// eslint-disable-next-line react-refresh/only-export-components
export const columns: ColumnDef<Aluno>[] = [
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

export default function DataTableDemo() {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});

	const table = useReactTable({
		data,
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
		},
	});

	return (
		<div className="w-full">
			<div className="flex items-center py-4 justify-between gap-10">
				<Input
					placeholder="Pesquisar alunos..."
					value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
					onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
					className="max-w-xl	"
				/>
				<Dialog>
					<DialogTrigger asChild>
						<Button className="bg-[#006FEE]/50 hover:bg-[#006FEE] text-white">Adicionar Aluno</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle>Edit profile</DialogTitle>
							<DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="name" className="text-right">
									Name
								</Label>
								<Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="username" className="text-right">
									Username
								</Label>
								<Input id="username" defaultValue="@peduarte" className="col-span-3" />
							</div>
						</div>
						<DialogFooter>
							<Button type="submit">Salvar</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
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
		</div>
	);
}
