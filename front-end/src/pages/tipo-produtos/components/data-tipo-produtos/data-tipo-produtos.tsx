import React from "react";
import { ArrowLeft, ArrowRight, PencilLine } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState } from "@tanstack/react-table";
import { Checkbox } from '@/components/ui/checkbox';
import { getTipoProdutos, TipoProdutoList } from "./get-tipo-produtos";

export default function DataTipoProdutos() {

    const [tipoProdutoList, setTipoProdutoList] = React.useState<TipoProdutoList[]>([]);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});


    const fetchTipoProdutos = React.useCallback(async () => {
        try {
            const data = await getTipoProdutos();
            setTipoProdutoList(data);
        } catch (error) {
            console.error('Erro ao buscar os tipos de produto:', error);
        }
    }, []);

    React.useEffect(() => {
        fetchTipoProdutos();
    }, [fetchTipoProdutos]);
    
    const handleSave = async () => {
        await fetchTipoProdutos();
    };

    const columns: ColumnDef<TipoProdutoList>[] = [
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
            accessorKey: 'vendaAGranel',
            header: () => <div className="font-bold">Venda à granel</div>,
            cell: ({ row }) => <div className="font-light">{row.getValue('vendaAGranel')}</div>,
        },
        {
            accessorKey: 'unidadeMedida',
            header: () => <div className="font-bold">Unidade de medida</div>,
            cell: ({ row }) => <div className="font-light">{row.getValue('unidadeMedida')}</div>,
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
        data: tipoProdutoList,
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
            <h1>Tipos de produtos</h1>
            <div className="flex items-center py-4 justify-between gap-10">
                <Input
                    placeholder="Pesquisar tipo produtos..."
                    value={(table.getColumn('descricao')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('descricao')?.setFilterValue(event.target.value)}
                    className="max-w-xl"
                />
                <div>
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
            {tipoProdutoList.length > 13 && (
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