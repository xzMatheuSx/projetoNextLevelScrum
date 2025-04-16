import React from "react";
import { ArrowLeft, ArrowRight, PencilLine } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState } from "@tanstack/react-table";
import { Checkbox } from '@/components/ui/checkbox';
import { getAlunoPresenca } from "./get-alunos-presentes";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import FormsMarcarPresenca from "../forms/forms-marcar-entrada";

export default function DataPresenca() {

    const [alunosPresentes, setAlunosPresentes] = React.useState<any[]>([]);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const [presencaFiltro, setPresencaFiltro] = React.useState<string>();
   
    const fetchPresencas = React.useCallback(async () => {
        try {
            const data = await getAlunoPresenca();

            setAlunosPresentes(data);
        } catch (error) {
            console.error('Erro ao buscar os tipos de produto:', error);
        }
    }, []);

    React.useEffect(() => {
        fetchPresencas();
    }, [fetchPresencas]);
    
    const handleSave = async () => {
        await fetchPresencas();
    };

    const columns: ColumnDef<any>[] = [
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
            accessorKey: 'aluno',
            header: () => <div className="font-bold">Aluno</div>,
            cell: ({ row }) => <div className="font-light">{row.getValue('aluno')}</div>,
        },
        {
            accessorKey: 'nome',
            header: () => <div className="font-bold">Nome</div>,
            cell: ({ row }) => <div className="font-light">{row.getValue('nome')}</div>,
        },
        {
            accessorKey: 'entrada',
            header: () => <div className="font-bold">Momento entrada</div>,
            cell: ({ row }) => <div className="font-light">{row.getValue('entrada')}</div>,
        },
        {
            accessorKey: 'saida',
            header: () => <div className="font-bold">Saída</div>,
            cell: ({ row }) => <div className="font-light">{row.getValue('saida')}</div>,
        },
        {
            accessorKey: 'duracao',
            header: () => <div className="font-bold">Tempo permanência</div>,
            cell: ({ row }) => <div className="font-light">{row.getValue('duracao')}</div>,
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
                           
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];


    const table = useReactTable({
        data: alunosPresentes,
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
            <h1>Presença</h1>

            <div className="flex items-center py-4 justify-between gap-10">
                <Input
                    placeholder="Pesquisar aluno..."
                    value={(table.getColumn('nome')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('nome')?.setFilterValue(event.target.value)}
                    className="max-w-xl"
                />

                <Select
                value={presencaFiltro}
                onValueChange={(value) => setPresencaFiltro(value)}
                >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filtrar por vencimento" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="presentes">Presentes</SelectItem>
                    <SelectItem value="do-dia">Do dia</SelectItem>
                    <SelectItem value="todos">Todos</SelectItem>
                </SelectContent>
                </Select>
                <div>
                </div>
            </div>
            <div className="flex items-end py-4 justify-between gap-10">
            <div>
                <FormsMarcarPresenca onSave={handleSave} />
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
            {alunosPresentes.length > 13 && (
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