import ECommerceTableActionsMenu from '@/components/ui/common/ECommerceTableActionsMenu';
import ECommerceTableHeader from '@/components/ui/common/ECommerceTableHeader';
import { ITag } from '@/models/tag.model';
import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper<ITag>();

export const getTagsColumn = (
  handleDelete: (_id: string) => Promise<boolean>,
  handleEdit: (_id: string) => void
) => [
  columnHelper.accessor('name', {
    header: ({ column }) => (
      <ECommerceTableHeader column={column} header="Name" />
    ),
  }),
  columnHelper.accessor('description', {
    header: ({ column }) => (
      <ECommerceTableHeader column={column} header="Description" />
    ),
    cell: ({ row }) =>
      row.original.description ? row.original.description : 'Not Available',
  }),

  columnHelper.display({
    header: 'Actions',
    cell: ({ row }) => {
      const { id } = row.original;

      return (
        <div className="flex justify-center">
          <ECommerceTableActionsMenu
            handleDelete={() => handleDelete(id.toString())}
            handleEdit={() => handleEdit(id.toString())}
          />
        </div>
      );
    },
    enableHiding: false,
  }),
];
