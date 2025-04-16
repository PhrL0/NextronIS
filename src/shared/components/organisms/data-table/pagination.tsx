'use client';

import { Button } from '@/shared/components/atom/button';
import { Flex } from '@/shared/components/atom/layout/flex';
import type { Table } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({ table }: PaginationProps<TData>) {
  return (
    <Flex justify="end" align="center" className="w-full gap-4 pt-4">
      {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
      <Button variant="outline" size="icon" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
        <ChevronLeft />
      </Button>
      <Button variant="outline" size="icon" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
        <ChevronRight />
      </Button>
    </Flex>
  );
}
