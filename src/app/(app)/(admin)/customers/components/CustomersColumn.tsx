import ECommerceSortDropDown from '@/components/ui/common/ECommerceSortDropDown';
import { createColumnHelper } from '@tanstack/react-table';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { IUser } from '@/models/user.model';
import ECommerceAvatar from '@/components/ui/common/ECommerceAvatar';

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
      return (
        <div className="flex items-center gap-2">
          <div className="flex justify-center gap-1">
            <span>Name</span>
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
  columnHelper.accessor('email', {
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-2">
          <div className="flex justify-center gap-1">
            <span>Email</span>
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
  columnHelper.accessor('orders', {
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-2">
          <div className="flex justify-center gap-1">
            <span>Orders</span>
            <ECommerceSortDropDown column={column} />
          </div>
        </div>
      );
    },
    cell: ({ row }) => row.original.orders?.length,
    sortingFn: 'alphanumericCaseSensitive',
  }),
];
