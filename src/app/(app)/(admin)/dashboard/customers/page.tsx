'use client';

import ECommerceTable from '@/components/ui/common/ECommerceTable';
import React from 'react';
import useCustomers from './hooks/useCustomers';
import { CustomersColumns } from './components/CustomersColumn';
import ECommerceDashboardPageHeader from '@/components/ui/common/ECommerceDashboardPageHeader';

const Customers = () => {
  const { data, isLoading } = useCustomers();
  return (
    <>
      <div className="flex h-full flex-col gap-8 p-6">
        <ECommerceDashboardPageHeader
          title="Customers"
          descriptions="Manage your users here"
        />
        <div className="flex-grow">
          <ECommerceTable
            data={data}
            columns={CustomersColumns}
            loading={isLoading}
          />
        </div>
      </div>
    </>
  );
};

export default Customers;
