'use client';

import { Badge } from '@/shared/components/atom/badge';
import { Input } from '@/shared/components/atom/input';
import { Flex } from '@/shared/components/atom/layout/flex';
import { Space } from '@/shared/components/atom/layout/space';
import { cn } from '@/shared/lib/utils';
import type { Table } from '@tanstack/react-table';

interface TopbarProps<TData> {
  table: Table<TData>;
  size: string;
  columnFilters: { id: string; value: string }[];
}

export function DataTableTopbar<TData>({ table, size, columnFilters }: TopbarProps<TData>) {
  return (
    <Flex align="center" className="w-full pb-4" justify="between">
      <Flex>
        <Input
          placeholder="Search"
          onChange={(event) => {
            table.setGlobalFilter(event.target.value);
          }}
          className={cn('max-w-sm', `!text-${size}`)}
        />
        <Space size={2}>
          {columnFilters.map((filter) => (
            <Badge key={filter.id}>
              {filter.id} : {`${filter.value}`}
            </Badge>
          ))}
        </Space>
      </Flex>
    </Flex>
  );
}
