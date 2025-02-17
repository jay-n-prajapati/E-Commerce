import { createColumnHelper } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { IProduct } from '@/models/product.model';
import Image from 'next/image';
import moment from 'moment';
import ECommerceTableHeader from '@/components/ui/common/ECommerceTableHeader';
import ECommerceTableActionsMenu from '@/components/ui/common/ECommerceTableActionsMenu';

const columnHelper = createColumnHelper<IProduct>();

export const getProductsColumn = (
  handleEdit: (_id: string) => void,
  handleDelete: (_id: string) => Promise<boolean>,
  handleView: (_id: string) => void
) => [
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

  columnHelper.accessor('thumbnailUrl', {
    header: '',
    cell: ({ row }) => {
      return (
        <div className="relative size-20">
          <Image
            src={row.original.thumbnailUrl}
            alt={row.original.name}
            className="rounded border object-contain p-1"
            fill
          />
        </div>
      );
    },
  }),

  columnHelper.accessor('name', {
    header: ({ column }) => {
      return <ECommerceTableHeader column={column} header="Product Name" />;
    },
    sortingFn: 'alphanumericCaseSensitive',
    filterFn: 'includesString',
  }),

  columnHelper.accessor('category', {
    header: ({ column }) => {
      return <ECommerceTableHeader column={column} header="Category" />;
    },
    sortingFn: 'alphanumericCaseSensitive',
    filterFn: 'includesString',
  }),

  columnHelper.accessor('price', {
    header: ({ column }) => {
      return <ECommerceTableHeader column={column} header="Price" />;
    },
    cell: ({ row }) => <div>${row.original.price}</div>,
    sortingFn: 'alphanumeric',
    filterFn: 'includesString',
  }),

  columnHelper.accessor('stockQuantity', {
    header: ({ column }) => (
      <ECommerceTableHeader column={column} header="Stock" />
    ),
    sortingFn: 'alphanumeric',
    filterFn: 'includesString',
  }),

  columnHelper.accessor('createdAt', {
    header: ({ column }) => {
      return <ECommerceTableHeader column={column} header="Created At" />;
    },
    cell: ({ row }) => (
      <div>{moment(row.original.createdAt).format('DD-MM-YYYY')}</div>
    ),
    sortingFn: 'datetime',
    filterFn: 'auto',
  }),
  columnHelper.accessor('updatedAt', {
    header: ({ column }) => {
      return <ECommerceTableHeader column={column} header="Updated At" />;
    },
    cell: ({ row }) => (
      <div>{moment(row.original.updatedAt).format('DD-MM-YYYY')}</div>
    ),
    sortingFn: 'datetime',
    filterFn: 'includesString',
  }),
  columnHelper.display({
    header: 'Actions',
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        <div className="flex items-center justify-center">
          <ECommerceTableActionsMenu
            handleDelete={async () => await handleDelete(id.toString())}
            handleEdit={() => handleEdit(id.toString())}
          >
            <div
              className="cursor-pointer px-2 py-1.5 hover:bg-secondary"
              onClick={() => handleView(id.toString())}
            >
              View
            </div>
          </ECommerceTableActionsMenu>
        </div>
      );
    },
    enableHiding: false,
  }),
];
