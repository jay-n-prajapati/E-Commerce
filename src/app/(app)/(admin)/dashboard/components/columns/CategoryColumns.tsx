import ECommerceTableActionsMenu from '@/components/ui/common/ECommerceTableActionsMenu';
import ECommerceTableHeader from '@/components/ui/common/ECommerceTableHeader';
import { ICategory } from '@/models/category.model';
import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper<ICategory>();

export const getCategoryColumns = (
  handleEdit: (_id: string) => void,
  handleDelete: (_id: string) => Promise<boolean>
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
      const { id } = row.original;
      return (
        <ECommerceTableActionsMenu
          handleDelete={() => handleDelete(id.toString())}
          handleEdit={() => handleEdit(id.toString())}
        />
      );
    },
    enableHiding: false,
  }),
];
