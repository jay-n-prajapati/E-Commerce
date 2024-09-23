'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '../table';
import { Button } from '../button';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Loader2,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../select';
import { Input } from '../input';
import { useState } from 'react';
import ECommerceColumnVisibilityDropdown from './ECommerceColumnVisibilityDropdown';
import Heading5 from '../headings/Heading5';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  showFooterNavigation: boolean;
  containerClassName: string;
  loading: boolean;
}

const ECommerceTable = <TData, TValue>({
  data,
  columns,
  showFooterNavigation = true,
  loading = false,
  containerClassName = '',
}: DataTableProps<TData, TValue>) => {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      rowSelection,
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getRowId(originalRow) {
      return originalRow.id;
    },
  });

  return (
    <div className="flex size-full flex-col">
      <div className="mb-4 flex gap-4">
        <Input
          placeholder="Search here.."
          onChange={(e) => table.setGlobalFilter(e.target.value)}
        />
        <ECommerceColumnVisibilityDropdown table={table} />
      </div>
      <div className="flex flex-col border">
        <Table containerClassName={containerClassName}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="py-4 font-bold text-primary"
                    >
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
            {loading && (
              <TableRow>
                <TableCell colSpan={columns.length} className="py-8">
                  <Loader2 className="mx-auto size-10 animate-spin text-primary repeat-infinite" />
                </TableCell>
              </TableRow>
            )}
            {!loading &&
              (table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center">
                    No results.
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter></TableFooter>
        </Table>
        {showFooterNavigation && (
          <div className="flex items-center justify-between border-t p-4">
            <div className="flex items-center gap-2">
              <Heading5 className="text-base">Rows: </Heading5>
              <Select onValueChange={(val) => table.setPageSize(+val)}>
                <SelectTrigger className="h-8 w-14 border-b border-none bg-secondary p-2 focus:ring-0">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>rows</SelectLabel>
                    {[5, 10, 15, 20, 30, 50].map((val) => (
                      <SelectItem key={val} value={val.toString()}>
                        {val}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size={'icon'}
                className="size-fit"
                variant={'outline'}
                onClick={() => table.firstPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronsLeft />
              </Button>
              <Button
                size={'icon'}
                className="size-fit"
                variant={'outline'}
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeft />
              </Button>
              <div>
                <Heading5>
                  {table.getState().pagination.pageIndex + 1}-
                  {table.getPageCount()}
                </Heading5>
              </div>
              <Button
                size={'icon'}
                className="size-fit"
                variant={'outline'}
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <ChevronRight />
              </Button>
              <Button
                size={'icon'}
                className="size-fit"
                variant={'outline'}
                onClick={() => table.lastPage()}
                disabled={!table.getCanNextPage()}
              >
                <ChevronsRight />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ECommerceTable;
