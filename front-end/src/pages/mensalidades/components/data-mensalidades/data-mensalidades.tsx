import React from "react";
import { ArrowLeft, ArrowRight, PencilLine } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState } from "@tanstack/react-table";
import { Checkbox } from '@/components/ui/checkbox';
import { getMensalidades, MensalidadeList } from "./get-mensalidades";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { Search, Loader2 } from "lucide-react"

export default function DataMensalidade() {

    const [mensalidadeList, setMensalidadeList] = React.useState<MensalidadeList[]>([]);

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [vencimentoFiltro, setVencimentoFiltro] = React.useState<string>();
    const [loading, setLoading] = React.useState(false);

    const fetchMensalidades = React.useCallback(async () => {
        try {
            pesquisarMensalidade("em-aberto")

        } catch (error) {
            console.error('Erro ao buscar as mensalidades:', error);
        }
    }, []);

    async function pesquisarMensalidade(tipo: string) {
        setLoading(true); 
        try {
            if (tipo == "em-aberto") {
                let data = await getMensalidades("a-vencer");
                let dataAux = await getMensalidades("vencidas");

                const combinado = [...data, ...dataAux];

                setMensalidadeList(combinado);  
            } else{
               
                const data = await getMensalidades(tipo);


                setMensalidadeList(data);

                console.log(data);
                console.log(tipo);
            }
        
        } catch (error) {
            console.error('Erro ao buscar as mensalidades:', error);
        } finally {
            setLoading(false); 
        }
    }

    function formatarData(data: string): string {
        const [ano, mes, dia] = data.split('-');
        return `${dia}/${mes}/${ano}`;
      }

    React.useEffect(() => {
        fetchMensalidades();
    }, [fetchMensalidades]);
    
    const handleSave = async () => {
        await fetchMensalidades();
    };

    const columns: ColumnDef<MensalidadeList>[] = [
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
            accessorKey: 'plano',
            header: () => <div className="font-bold">Plano</div>,
            cell: ({ row }) => <div className="font-light">{row.getValue('plano')}</div>,
        },
        {
            accessorKey: 'valor',
            header: () => <div className="font-bold">Valor</div>,
            cell: ({ row }) => <div className="font-light">{row.getValue('valor')}</div>,
        },
        {
            accessorKey: 'vencimento',
            header: () => <div className="font-bold">Vencimento</div>,
            cell: ({ row }) => {
              const dataOriginal = row.getValue('vencimento') as string;
              const dataFormatada = formatarData(dataOriginal);
              return <div className="font-light">{dataFormatada}</div>;
            },
        },
        {
            accessorKey: 'pago',
            header: () => <div className="font-bold">Pago</div>,
            cell: ({ row }) => <div className="font-light">{row.getValue('pago')}</div>,
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
        data: mensalidadeList,
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
            <h1>Mensalidades</h1>
            <div className="flex items-center py-4 justify-between gap-10">
            <div className="flex items-center gap-4 w-full">
                <Input
                placeholder="Pesquisar aluno..."
                value={(table.getColumn('aluno')?.getFilterValue() as string) ?? ''}
                onChange={(event) => table.getColumn('aluno')?.setFilterValue(event.target.value)}
                className="max-w-xl"
                />

                <Select
                value={vencimentoFiltro}
                onValueChange={(value) => setVencimentoFiltro(value)}
                >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filtrar por vencimento" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="a-vencer">À vencer</SelectItem>
                    <SelectItem value="vencidas">Vencidas</SelectItem>
                    <SelectItem value="em-aberto">Em aberto</SelectItem>
                    <SelectItem value="todos">Todas</SelectItem>
                </SelectContent>
                </Select>

                <Button
                onClick={() => pesquisarMensalidade(vencimentoFiltro!)}
                className="flex items-center gap-2"
                disabled={loading}
                >
                {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                    <Search className="w-4 h-4" />
                )}
                {loading ? "Carregando..." : "Pesquisar"}
                </Button>
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
            {mensalidadeList.length > 13 && (
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