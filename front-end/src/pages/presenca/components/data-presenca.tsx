import React from "react";
import { ArrowLeft, ArrowRight, Loader2, PencilLine, Search } from 'lucide-react';
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
import FormsMarcarSaida from "../forms/forms-marcar-saida";

export default function DataPresenca() {

    const [alunosPresentes, setAlunosPresentes] = React.useState<any[]>([]);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const [presencaFiltro, setPresencaFiltro] = React.useState<string>();
   
    const fetchPresencas = React.useCallback(async () => {
        try {
            setPresencaFiltro("presentes")
            pesquisarPresencas("presentes");

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
            cell: ({ row }) => {
              const saida = row.original.saida
          
              // Se a saída não for vazia, não renderiza nada
              if (saida && saida !== '') return null
          
              return (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Abrir Menu</span>
                      <PencilLine />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <FormsMarcarSaida
                        matricula={row.original.matricula}
                        onSave={handleSave}
                      />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            },
          }
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

    async function pesquisarPresencas(presenca: string){
        setLoading(true); 
        try {
                let data = await getAlunoPresenca(presenca);

                console.log(data)
                setAlunosPresentes(data); 
                
          
        
        } catch (error) {
            console.error('Erro ao buscar as mensalidades:', error);
        } finally {
            setLoading(false); 
        }
    }
    
    const [loading, setLoading] = React.useState(false);
    
    return (
        <div className="w-full">
            <h1>Presença</h1>

            <div className="flex flex-wrap items-center gap-4 py-4">
            {/* Input de pesquisa - cresce conforme espaço */}
            <div className="flex-grow min-w-[200px] max-w-[500px]">
                <Input
                placeholder="Pesquisar aluno..."
                value={(table.getColumn('nome')?.getFilterValue() as string) ?? ''}
                onChange={(event) => table.getColumn('nome')?.setFilterValue(event.target.value)}
                className="w-full"
                />
            </div>

            {/* Select - tamanho fixo ou ajustável */}
            <div className="flex-shrink-0 w-[180px]">
                <Select value={presencaFiltro} onValueChange={(value) => setPresencaFiltro(value)}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filtrar por presença" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="presentes">Presentes</SelectItem>
                    <SelectItem value="presentes-dia">Do dia</SelectItem>
                    <SelectItem value="todos">Todos</SelectItem>
                </SelectContent>
                </Select>
            </div>

            {/* Botão de pesquisa - se mantém compacto */}
            <div className="flex-shrink-0">
                <Button
                onClick={() => pesquisarPresencas(presencaFiltro!)}
                className="flex items-center gap-2 whitespace-nowrap"
                disabled={loading}
                >
                {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                    <Search className="w-4 h-4" />
                )}
                {loading ? 'Carregando...' : 'Pesquisar'}
                </Button>
            </div>

            <div className="flex items-end py-4 justify-between gap-10">
                <FormsMarcarPresenca onSave={handleSave} />
            </div>
</div>

            <div className="flex items-end py-4 justify-between gap-10">
    
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