import { exportTo } from '@/shared/lib/exportTo';
import { capitalize } from '@/shared/lib/utils';
import { Table } from '@tanstack/react-table';
import { Eye, EyeOff } from 'lucide-react';
import { ReactElement } from 'react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger
} from '../../molecules/menubar';

interface ToolbarProps<TData> {
  table: Table<TData>;
  onExportPDF: () => void;
}

interface MenuItem {
  key: string;
  label: string | ReactElement;
  onClick?: () => void;
  items?: MenuItem[];
}

export function DataTableToolbar<TData>({ table, onExportPDF }: ToolbarProps<TData>) {
  const menubarExportItems: MenuItem[] = [
    {
      key: 'export',
      label: 'Exportar',
      items: [
        {
          key: 'csv',
          label: '.csv',
          onClick: () =>
            exportTo(
              'csv',
              table.getFilteredRowModel().rows.map((row) => row.original)
            )
        },
        {
          key: 'pdf',
          label: '.pdf',
          onClick: onExportPDF
        },
        {
          key: 'xls',
          label: '.xls',
          onClick: () =>
            exportTo(
              'xlsx',
              table.getFilteredRowModel().rows.map((row) => row.original)
            )
        },
        {
          key: 'xls2',
          label: '.xls (ExcelJS)',
          onClick: () =>
            exportTo(
              'exceljs',
              table.getFilteredRowModel().rows.map((row) => row.original)
            )
        },
        {
          key: 'txt',
          label: '.txt',
          onClick: () =>
            exportTo(
              'txt',
              table.getFilteredRowModel().rows.map((row) => row.original)
            )
        }
      ]
    }
  ];
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Arquivo</MenubarTrigger>
        <MenubarContent>{menubarExportItems.map((item) => menubarRender(item))}</MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Configurações</MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>Colunas</MenubarSubTrigger>
            <MenubarSubContent>
              {table
                .getAllColumns()
                .map((col) => ({
                  key: col.id,
                  label: (
                    <>
                      {col.getIsVisible() ? <Eye /> : <EyeOff />}
                      {capitalize(col.id)}
                    </>
                  ),
                  onClick: () => col.toggleVisibility(!col.getIsVisible())
                }))
                .map((col) => menubarRender(col))}
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

const menubarRender = (item: MenuItem) =>
  item.items ? (
    <MenubarSub key={item.key}>
      <MenubarSubTrigger>{item.label}</MenubarSubTrigger>
      <MenubarSubContent>{item.items?.map((subItem) => menubarRender(subItem))}</MenubarSubContent>
    </MenubarSub>
  ) : (
    <MenubarItem key={item.key} onClick={item.onClick}>
      {item.label}
    </MenubarItem>
  );
