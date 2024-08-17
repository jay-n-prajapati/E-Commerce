'use client';

import ECommerceTable from '@/components/ui/common/ECommerceTable';
import { RecentOrdersColumns } from './RecentOrdersColumn';

export type Order = {
  id: number;
  createdAt: string;
  totalAmount: string;
  status: string;
};

const orders = [
  {
    id: 1,
    createdAt: '2024-08-01',
    totalAmount: '$149.99',
    status: 'Completed',
  },
  { id: 2, createdAt: '2024-08-02', totalAmount: '$89.49', status: 'Shipped' },
  { id: 3, createdAt: '2024-08-03', totalAmount: '$119.99', status: 'Pending' },
  {
    id: 4,
    createdAt: '2024-08-04',
    totalAmount: '$249.00',
    status: 'Delivered',
  },
  { id: 5, createdAt: '2024-08-05', totalAmount: '$59.95', status: 'Canceled' },
  { id: 6, createdAt: '2024-08-06', totalAmount: '$79.99', status: 'Pending' },
  {
    id: 7,
    createdAt: '2024-08-07',
    totalAmount: '$189.99',
    status: 'Completed',
  },
  { id: 8, createdAt: '2024-08-08', totalAmount: '$99.99', status: 'Shipped' },
  {
    id: 9,
    createdAt: '2024-08-09',
    totalAmount: '$139.00',
    status: 'Delivered',
  },
  {
    id: 10,
    createdAt: '2024-08-10',
    totalAmount: '$109.50',
    status: 'Pending',
  },
  {
    id: 11,
    createdAt: '2024-08-11',
    totalAmount: '$129.99',
    status: 'Completed',
  },
  {
    id: 12,
    createdAt: '2024-08-12',
    totalAmount: '$209.99',
    status: 'Shipped',
  },
  {
    id: 13,
    createdAt: '2024-08-13',
    totalAmount: '$149.49',
    status: 'Delivered',
  },
  { id: 14, createdAt: '2024-08-14', totalAmount: '$89.99', status: 'Pending' },
  {
    id: 15,
    createdAt: '2024-07-15',
    totalAmount: '$299.00',
    status: 'Canceled',
  },
  {
    id: 16,
    createdAt: '2024-07-16',
    totalAmount: '$79.00',
    status: 'Completed',
  },
  {
    id: 17,
    createdAt: '2024-08-17',
    totalAmount: '$129.95',
    status: 'Shipped',
  },
  {
    id: 18,
    createdAt: '2024-08-18',
    totalAmount: '$189.99',
    status: 'Delivered',
  },
  {
    id: 19,
    createdAt: '2024-08-19',
    totalAmount: '$139.99',
    status: 'Pending',
  },
  {
    id: 20,
    createdAt: '2024-08-20',
    totalAmount: '$109.95',
    status: 'Completed',
  },
  {
    id: 21,
    createdAt: '2024-08-21',
    totalAmount: '$119.99',
    status: 'Shipped',
  },
  {
    id: 22,
    createdAt: '2024-08-22',
    totalAmount: '$99.00',
    status: 'Delivered',
  },
  {
    id: 23,
    createdAt: '2024-08-23',
    totalAmount: '$149.99',
    status: 'Pending',
  },
  {
    id: 24,
    createdAt: '2024-08-24',
    totalAmount: '$89.99',
    status: 'Canceled',
  },
  {
    id: 25,
    createdAt: '2024-08-25',
    totalAmount: '$79.99',
    status: 'Completed',
  },
  {
    id: 26,
    createdAt: '2024-08-26',
    totalAmount: '$159.00',
    status: 'Shipped',
  },
  {
    id: 27,
    createdAt: '2024-08-27',
    totalAmount: '$119.99',
    status: 'Delivered',
  },
  {
    id: 28,
    createdAt: '2024-08-28',
    totalAmount: '$209.99',
    status: 'Pending',
  },
  {
    id: 29,
    createdAt: '2024-08-29',
    totalAmount: '$109.00',
    status: 'Completed',
  },
  {
    id: 30,
    createdAt: '2024-08-30',
    totalAmount: '$139.95',
    status: 'Shipped',
  },
];

const RecentOrders = () => {
  return (
    <div>
      <ECommerceTable<Order, any>
        data={orders as Order[]}
        columns={RecentOrdersColumns}
      />
    </div>
  );
};

export default RecentOrders;
