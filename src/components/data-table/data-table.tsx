import { DataTablePagination } from '@/components/data-table/pagination';
import { DataTableToolbar } from '@/components/data-table/toolbar';
import { Flex } from '@/components/layout/flex';
import { Loading } from '@/components/layout/loading';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { autoFormat, capitalize, isNestedObject } from '@/lib/utils';
import {
  type ColumnDef,
  type ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable
} from '@tanstack/react-table';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ArrowDown, ArrowUp, Filter, MoreHorizontal } from 'lucide-react';
import { useMemo, useState } from 'react';
import { DataTablePDFViewer } from './pdf-viewer';
import { DataTableView } from './table-view';
import { DataTableTopbar } from './topbar';

export interface DataTableProps<TData extends object> {
  data: TData[];
  loading: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  isNested?: boolean;
  nestedTitle?: string;
}

export function DataTable<TData extends object>({
  data = [],
  loading = false,
  size = 'sm',
  isNested = false
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pdfUrl, setPdfUrl] = useState<string>('');
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const columns: ColumnDef<TData, object>[] = useMemo(() => {
    if (data.length > 0)
      return Object.keys(data[0] as object).map((col) => ({
        header: ({ column }) => {
          console.log(column);
          return (
            <Flex align="center" justify="between">
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                className="flex w-full justify-between"
                size={size as 'sm' | 'lg' | 'default' | 'icon' | null | undefined}
              >
                {capitalize(col)}

                <Flex style={{ opacity: column.getIsSorted() ? 1 : 0 }} align="center" justify="end">
                  {column.getIsSorted() === 'asc' ? <ArrowDown /> : <ArrowUp />}
                </Flex>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button size="icon" variant="ghost">
                    <MoreHorizontal size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Opções</DropdownMenuLabel>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Filter size={16} />
                      Filtros
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="p-2">
                      <DropdownMenuLabel>Filtro por {col}</DropdownMenuLabel>

                      <div className="space-y-2">
                        <Input
                          placeholder={'Filtrar ' + col}
                          onChange={(event) => column.setFilterValue(event.target.value)}
                          value={`${column.getFilterValue() ?? ''}`}
                          className="max-w-sm !p-2 !text-xs"
                        />
                        <DropdownMenuSeparator />
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="destructive" onClick={() => column.setFilterValue('')}>
                            Resetar
                          </Button>
                        </div>
                      </div>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                </DropdownMenuContent>
              </DropdownMenu>
            </Flex>
          );
        },
        accessorKey: col,
        cell: (info) => autoFormat(info.getValue())
      }));
    return [];
  }, [data, size]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),

    state: {
      sorting,
      columnFilters
    }
  });

  const handleExportPDF = () => {
    const _data: TData[] = table.getFilteredRowModel().rows.map((row) => row.original);

    const doc = new jsPDF('landscape', 'mm', 'a4');
    console.log(_data);
    const header = [Object.keys(_data[0])];
    autoTable(doc, {
      head: header,
      body: _data.map((item) => {
        // Convert nested objects to string representation for PDF export
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return Object.entries(item).map(([_, value]) => {
          if (isNestedObject(value)) {
            return JSON.stringify(value);
          }
          return value;
        });
      }),
      styles: {
        fontSize: 6,
        fillColor: '#ffffff',
        lineWidth: 0.01,
        lineColor: '#313131'
      },
      headStyles: { fillColor: '#313131' }
    });

    setPdfUrl(doc.output('dataurlstring'));
  };

  if (loading)
    return (
      <div className="size-full space-y-4">
        <Skeleton className="h-8 w-full" />
        <Flex justify="between">
          <Skeleton className="h-8 w-1/4" />
        </Flex>
        <Skeleton className="h-80 w-full">
          <Loading variant="medium" title="Carregando..." color="primary" />
        </Skeleton>
      </div>
    );

  // Simplified view for nested tables
  if (isNested) {
    return <DataTableView table={table} size={size} />;
  }

  // Full view for main table
  return (
    <div className="grid w-full grid-cols-1 gap-4">
      {/* PDF Viewer */}
      <DataTablePDFViewer pdfUrl={pdfUrl} onClose={() => setPdfUrl('')} />

      {/* Toolbar */}
      <DataTableToolbar table={table} onExportPDF={handleExportPDF} />

      {/* Main Content */}
      <Flex vertical className="w-full">
        {/* Topbar with search and filters */}
        <DataTableTopbar
          table={table}
          size={size}
          columnFilters={columnFilters.map((filter) => ({
            id: filter.id,
            value: String(filter.value)
          }))}
        />

        {/* Table */}
        <DataTableView table={table} size={size} />

        {/* Pagination */}
        <DataTablePagination table={table} />
      </Flex>
    </div>
  );
}
