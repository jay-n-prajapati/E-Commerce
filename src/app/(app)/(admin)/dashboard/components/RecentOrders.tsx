'use client';

import ECommerceTable from '@/components/ui/common/ECommerceTable';
import Heading5 from '@/components/ui/headings/Heading5';
import React from 'react';
import { RecentOrdersColumn } from './columns/RecentOrdersColumns';

export default function RecentOrders() {
  return (
    <div className="flex flex-col gap-4 border p-5 lg:basis-3/5">
      <Heading5>Recent Orders</Heading5>
      <div className="flex-grow">
        <ECommerceTable
          data={[]}
          columns={RecentOrdersColumn}
          containerClassName="max-h-80"
        />
      </div>
    </div>
  );
}
