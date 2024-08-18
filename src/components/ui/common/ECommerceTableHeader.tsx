import React from 'react';
import { Input } from '../input';
import ECommerceSortDropDown from './ECommerceSortDropDown';
import { Column } from '@tanstack/react-table';

const ECommerceTableHeader = ({
  column,
  header,
}: {
  column: Column<any, any>;
  header: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <span>{header}</span>
      <div className="flex items-center justify-center rounded border">
        <Input
          className="h-8 border-none py-0 outline-none focus-visible:ring-0"
          onChange={(e) => column.setFilterValue(e.target.value)}
        />
        <ECommerceSortDropDown column={column} />
      </div>
    </div>
  );
};

export default ECommerceTableHeader;
