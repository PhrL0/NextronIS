"use client";

import { Flex } from "@/components/layout/flex";
import { Space } from "@/components/layout/space";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { Table } from "@tanstack/react-table";

interface TopbarProps<TData> {
  table: Table<TData>;
  size: string;
  columnFilters: { id: string; value: string }[];
}

export function DataTableTopbar<TData>({
  table,
  size,
  columnFilters,
}: TopbarProps<TData>) {
  return (
    <Flex align="center" className="pb-4 w-full" justify="between">
      <Flex>
        <Input
          placeholder="Search"
          onChange={(event) => {
            table.setGlobalFilter(event.target.value);
          }}
          className={cn("max-w-sm", `!text-${size}`)}
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
