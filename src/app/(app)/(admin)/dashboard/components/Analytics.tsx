import { getAnalytics } from '@/actions/AnalysisData';
import Heading4 from '@/components/ui/headings/Heading4';
import Heading5 from '@/components/ui/headings/Heading5';
import { Box, DollarSign, Package, User2 } from 'lucide-react';
import React from 'react';

export default async function Analytics() {
  const { users, orders, products } = await getAnalytics();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="flex size-full flex-col gap-4 rounded-lg border p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <Heading5 className="text-secondary-foreground">
            Total Products
          </Heading5>
          <Package />
        </div>
        <Heading4 className="text-secondary-foreground">{products}</Heading4>
      </div>
      <div className="flex size-full flex-col gap-4 rounded-lg border p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <Heading5 className="text-secondary-foreground">Total Users</Heading5>
          <User2 />
        </div>
        <Heading4 className="text-secondary-foreground">{users}</Heading4>
      </div>
      <div className="flex size-full flex-col gap-4 rounded-lg border p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <Heading5 className="text-secondary-foreground">
            Total Orders
          </Heading5>
          <Box />
        </div>
        <Heading4 className="text-secondary-foreground">{orders}</Heading4>
      </div>
      <div className="flex size-full flex-col gap-4 rounded-lg border p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <Heading5 className="text-secondary-foreground">
            Total Revenue
          </Heading5>
          <DollarSign />
        </div>
        <Heading4 className="text-secondary-foreground">25,652</Heading4>
      </div>
    </div>
  );
}
