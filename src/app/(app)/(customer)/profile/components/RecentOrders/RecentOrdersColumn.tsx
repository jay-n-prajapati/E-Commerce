import { Badge } from '@/components/ui/badge';
import ECommerceSortDropDown from '@/components/ui/common/ECommerceSortDropDown';
import { createColumnHelper } from '@tanstack/react-table';
import { Order } from './RecentOrders';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

const columnHelper = createColumnHelper<Order>();

export const RecentOrdersColumns = [
  columnHelper.display({
    id: 'actions',
    header: ({ table }) => (
      <div>
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div>
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
          }}
        />
      </div>
    ),
    enableHiding: false,
  }),

  columnHelper.accessor('id', {
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-2">
          <div className="flex justify-center gap-1">
            <span>ID</span>
            <ECommerceSortDropDown column={column} />
          </div>
          <Input
            placeholder=""
            className="w-1/2 py-0"
            onChange={(e) => column.setFilterValue(e.target.value)}
          />
        </div>
      );
    },
    sortingFn: 'alphanumericCaseSensitive',
    filterFn: 'includesString',
  }),
  columnHelper.accessor('createdAt', {
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-2">
          <div className="flex justify-center gap-1">
            <span>Ordered At</span>
            <ECommerceSortDropDown column={column} />
          </div>
          <Input
            placeholder=""
            className="w-1/2 py-0"
            onChange={(e) => column.setFilterValue(e.target.value)}
          />
        </div>
      );
    },
    sortingFn: 'datetime',
  }),
  columnHelper.accessor('totalAmount', {
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-2">
          <div className="flex justify-center gap-1">
            <span>Total Amount</span>
            <ECommerceSortDropDown column={column} />
          </div>
          <Input
            placeholder=""
            className="w-1/2 py-0"
            onChange={(e) => column.setFilterValue(e.target.value)}
          />
        </div>
      );
    },
    sortingFn: 'alphanumericCaseSensitive',
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: ({ row }) => {
      return (
        <Badge
          className={row.original.status === 'Completed' ? 'bg-green-600' : ''}
          variant={
            row.original.status === 'Pending' ? 'destructive' : 'default'
          }
        >
          {row.original.status}
        </Badge>
      );
    },
  }),
];
