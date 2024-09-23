'use client';

import ECommerceTable from '@/components/ui/common/ECommerceTable';
import React from 'react';
import useCustomers from './hooks/useCustomers';
import { CustomersColumns } from './components/CustomersColumn';
import Heading2 from '@/components/ui/headings/Heading2';

const Customers = () => {
  const { data, isLoading } = useCustomers();
  return (
    <>
      <div className="flex min-h-full flex-col gap-8 border bg-primary-foreground p-6">
        <div>
          <Heading2 className="mb-1 font-bold">Customers</Heading2>
          <p className="font-medium">
            Manage your Customers and view their details.
          </p>
        </div>
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
