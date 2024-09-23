import ECommerceAlertDialog from '@/components/ui/common/ECommerceAlertDialog';
import ECommerceTableHeader from '@/components/ui/common/ECommerceTableHeader';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ICategory } from '@/models/category.model';
import { createColumnHelper } from '@tanstack/react-table';
import { EllipsisVertical } from 'lucide-react';

const columnHelper = createColumnHelper<ICategory>();

export const getCategoryColumns = (
  handleEdit: (id: string) => void
  // handleDelete: (id: string) => void
) => [
  columnHelper.accessor('name', {
    header: ({ column }) => {
      return <ECommerceTableHeader column={column} header="Name" />;
    },
    cell: ({ row }) => <div className="capitalize">{row.original.name}</div>,
    sortingFn: 'alphanumericCaseSensitive',
    filterFn: 'includesString',
  }),

  columnHelper.accessor('slug', {
    header: ({ column }) => {
      return <ECommerceTableHeader column={column} header="Slug" />;
    },
    sortingFn: 'alphanumericCaseSensitive',
    filterFn: 'includesString',
  }),

  columnHelper.display({
    header: 'Actions',
    cell: ({ row }) => {
      return (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleEdit(row.original.id.toString())}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {}}>
                <ECommerceAlertDialog
                  title="Are you Sure to Delete Category?"
                  description="If you press Continue the category will permanently get deleted."
                  onConfirm={() => {}}
                >
                  Delete
                </ECommerceAlertDialog>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
    enableHiding: false,
  }),
];
