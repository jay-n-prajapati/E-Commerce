import { IOrder } from '@/models/order.model';
import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper<IOrder>();

export const RecentOrdersColumn = [
  columnHelper.accessor('user', {
    header: 'User',
  }),
  columnHelper.accessor('totalAmount', {
    header: 'Total Amount',
  }),
  columnHelper.accessor('createdAt', {
    header: 'Ordered At',
  }),
  columnHelper.accessor('status', {
    header: 'Status',
  }),
];
