"use client";

import { Flex } from "@/components/layout/flex";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { capitalize, cn, isNestedObject } from "@/lib/utils";
import type { Table as TableType } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import { ChevronDown, ChevronUp, SearchX } from "lucide-react";
import { JSX, useState } from "react";

interface DataTableViewProps<TData> {
  table: TableType<TData>;
  size: string;
}

export function DataTableView<TData>({
  table,
  size,
}: DataTableViewProps<TData>) {
  // State to track expanded rows
  const [expandedRows, setExpandedRows] = useState<
    Record<string, Record<string, boolean>>
  >({});

  // Function to toggle row expansion for a specific column
  const toggleRowExpansion = (rowId: string, columnId: string) => {
    setExpandedRows((prev) => {
      const rowExpansions = prev[rowId] || {};
      return {
        ...prev,
        [rowId]: {
          ...rowExpansions,
          [columnId]: !rowExpansions[columnId],
        },
      };
    });
  };

  // Check if a specific cell is expanded
  const isCellExpanded = (rowId: string, columnId: string): boolean => {
    return !!expandedRows[rowId]?.[columnId];
  };

  return (
    <Flex className="w-full overflow-auto">
      <Table>
        <TableHeader className="bg-primary/5">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <>
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={cn(`!text-${size}`)}>
                      {isNestedObject(cell.getValue()) ? (
                        <ExpandableButton
                          onClick={() =>
                            toggleRowExpansion(row.id, cell.column.id)
                          }
                          isOpen={isCellExpanded(row.id, cell.column.id)}
                        />
                      ) : (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      )}
                    </TableCell>
                  ))}
                </TableRow>
                {/* Render expanded detail rows */}
                {row.getVisibleCells().map((cell) => {
                  const value = cell.getValue();
                  const isExpanded = isCellExpanded(row.id, cell.column.id);

                  if (isNestedObject(value) && isExpanded) {
                    return (
                      <TableRow
                        key={`${row.id}-${cell.column.id}-detail`}
                        className="bg-muted/10"
                      >
                        <TableCell
                          colSpan={row.getVisibleCells().length}
                          className="p-0"
                        >
                          <div className="mb-8">
                            {renderNestedTable(
                              typeof value === "object" && value !== null
                                ? value
                                : {},
                              `${capitalize(cell.column.id)} - Detalhes:`
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  }
                  return null;
                })}
              </>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={table.getAllColumns().length}
                className="h-24 text-center"
              >
                <Flex
                  className="text-muted-foreground stroke-muted-foreground p-6"
                  align="center"
                  justify="center"
                  vertical
                  gap={2}
                >
                  <SearchX size={48} strokeWidth={1} />
                  <p>No results.</p>
                </Flex>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Flex>
  );
}

const ExpandableButton = ({
  isOpen,
  onClick,
}: {
  onClick: () => void;
  isOpen: boolean;
}) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="flex items-center justify-between w-full p-1 h-auto text-xs"
      onClick={onClick}
    >
      {isOpen ? (
        <ChevronUp className="h-3 w-3" />
      ) : (
        <ChevronDown className="h-3 w-3" />
      )}
    </Button>
  );
};

function ExpandableCell({ value }: { value: object | object[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <ExpandableButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />
      {isOpen && renderNestedTable(value)}
    </div>
  );
}

const renderNestedTable = (
  data: object | object[],
  title?: string
): JSX.Element | null => {
  if (!data) return null;

  // Handle array data
  if (Array.isArray(data)) {
    return renderArrayTable(data, title);
  }

  // Handle object data
  return (
    <div className="p-2">
      {title && <div className="text-sm font-medium mb-2">{title}</div>}
      <Table className="border-b">
        <TableHeader className="bg-muted/50">
          <TableRow>
            {Object.keys(data).map((key) => (
              <TableHead key={key} className="text-xs p-2">
                {capitalize(key)}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            {Object.entries(data).map(([key, value]) => {
              return (
                <TableCell key={key} className="text-xs p-2">
                  {isNestedObject(value) ? (
                    <ExpandableCell value={value} />
                  ) : (
                    String(value)
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

const renderArrayTable = (
  data: object[],
  title?: string
): JSX.Element | null => {
  if (!data || !data.length)
    return <div className="p-2 text-xs">Array vazio</div>;

  // For arrays of primitive values
  if (!isNestedObject(data[0])) {
    return (
      <div className="p-2">
        {title && <div className="text-sm font-medium mb-2">{title}</div>}
        <Table className="border border-border">
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="text-xs p-2">Índice</TableHead>
              <TableHead className="text-xs p-2">Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((value, index) => (
              <TableRow key={index}>
                <TableCell className="text-xs p-2">{index}</TableCell>
                <TableCell className="text-xs p-2">{String(value)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  // For arrays of objects
  const columns = Object.keys(data[0]);

  return (
    <div className="p-2">
      {title && <div className="text-sm font-medium mb-2">{title}</div>}
      <Table className="border border-border">
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="text-xs p-2">Índice</TableHead>
            {columns.map((column) => (
              <TableHead key={column} className="text-xs p-2">
                {capitalize(column)}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {/*eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
          {data.map((item: Record<string, any>, index) => (
            <TableRow key={index}>
              <TableCell className="text-xs p-2">{index}</TableCell>
              {columns.map((column) => {
                const value = item[column];
                return (
                  <TableCell key={column} className="text-xs p-2">
                    {isNestedObject(value) ? (
                      <ExpandableCell value={value} />
                    ) : (
                      String(value)
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
