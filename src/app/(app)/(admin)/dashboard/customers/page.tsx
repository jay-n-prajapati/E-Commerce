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
    </>
  );
};

export default Customers;
