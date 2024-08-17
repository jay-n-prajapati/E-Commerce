'use client';

import ECommerceTable from '@/components/ui/common/ECommerceTable';
import Heading3 from '@/components/ui/headings/Heading3';
import React from 'react';
import useCustomers from './hooks/useCustomers';
import { CustomersColumns } from './components/CustomersColumn';

const Customers = () => {
  const { data } = useCustomers();
  return (
    <>
      <div className="rounded-t-lg border bg-primary-foreground p-4">
        <div>
          <Heading3 className="mb-1 font-bold">Customers</Heading3>
          <p className="font-medium">
            Manage your Customers and view their details.
          </p>
        </div>
        <div className="mt-8">
          <ECommerceTable data={data} columns={CustomersColumns} />
        </div>
      </div>
    </>
  );
};

export default Customers;
