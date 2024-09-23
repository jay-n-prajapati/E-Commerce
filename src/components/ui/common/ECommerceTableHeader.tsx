import React from 'react';
import { Input } from '../input';
import ECommerceSortDropDown from './ECommerceSortDropDown';
import { Column } from '@tanstack/react-table';

const ECommerceTableHeader = ({
  column,
  header,
}: {
  column: Column<unknown, unknown>;
  header: string;
}) => {
  return (
    <div className="flex items-center justify-center rounded border">
      <Input
        className="h-8 border-none py-0 outline-none placeholder:text-primary/70 focus-visible:ring-0"
        onChange={(e) => column.setFilterValue(e.target.value)}
        placeholder={header}
      />
      <ECommerceSortDropDown column={column} />
    </div>
  );
};

export default ECommerceTableHeader;
