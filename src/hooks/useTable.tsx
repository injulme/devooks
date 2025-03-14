import { useState } from 'react';

import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  Row,
  useReactTable,
} from '@tanstack/react-table';

interface TableProps<TData, TValue = unknown> {
  data?: Row<TData>[] | any;
  columns: ColumnDef<TData, TValue>[];
  totalPages: number;
  totalElements: number;
  rowId: keyof TData;
  defaultPageIndex?: number;
  defaultPagingSize?: number;
}

export default function useTable<TData, TValue>({
  data,
  columns,
  totalPages,
  totalElements,
  defaultPageIndex = 1,
  defaultPagingSize = 10,
}: TableProps<TData, TValue>) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: defaultPageIndex,
    pageSize: defaultPagingSize,
  });

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    manualPagination: true,
    pageCount: totalPages || 0,
    rowCount: totalElements || 0,

    state: {
      pagination,
    },
  });

  return table;
}
