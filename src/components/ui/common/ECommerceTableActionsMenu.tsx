import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ECommerceAlertDialog from './ECommerceAlertDialog';
import { MoreHorizontal } from 'lucide-react';
import { ReactNode } from 'react';

interface IProps {
  handleEdit: () => void;
  handleDelete: () => Promise<boolean>;
  children?: ReactNode;
}

export default function ECommerceTableActionsMenu({
  handleDelete,
  handleEdit,
  children,
}: IProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal strokeWidth={1} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleEdit()}>Edit</DropdownMenuItem>
        <ECommerceAlertDialog
          title={`Are you Sure to Delete this Item?`}
          description="If you press Continue the Item will permanently get deleted."
          onConfirm={async () => await handleDelete()}
        >
          Delete
        </ECommerceAlertDialog>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
