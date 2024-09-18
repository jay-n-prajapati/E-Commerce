import ECommerceSortDropDown from '@/components/ui/common/ECommerceSortDropDown';
import { createColumnHelper } from '@tanstack/react-table';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { IUser } from '@/models/user.model';
import ECommerceAvatar from '@/components/ui/common/ECommerceAvatar';
import ECommerceTableHeader from '@/components/ui/common/ECommerceTableHeader';

const columnHelper = createColumnHelper<IUser>();

export const CustomersColumns = [
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

    cell: ({ row, table }) => (
      <div>
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
            console.log(table.getSelectedRowModel().rows);
          }}
        />
      </div>
    ),
    enableHiding: false,
  }),

  columnHelper.accessor('imgUrl', {
    header: 'Profile',
    cell: ({ row }) => {
      return (
        <ECommerceAvatar
          src={row.original.imgUrl}
          username={row.original.name}
        />
      );
    },
  }),

  columnHelper.accessor('name', {
    header: ({ column }) => {
      return <ECommerceTableHeader column={column} header="Name" />;
    },
    sortingFn: 'alphanumericCaseSensitive',
    filterFn: 'includesString',
  }),
  columnHelper.accessor('email', {
    header: ({ column }) => {
      return <ECommerceTableHeader column={column} header="Email" />;
    },
    sortingFn: 'datetime',
  }),
  columnHelper.accessor('orders', {
    header: ({ column }) => {
      return <ECommerceTableHeader column={column} header="Orders" />;
    },
    cell: ({ row }) => row.original.orders?.length,
    sortingFn: 'alphanumericCaseSensitive',
  }),
];
