import React from 'react';
import NoProducts from './components/NoProducts';
import ProductManage from './components/ProductManage';
import Heading3 from '@/components/ui/headings/Heading3';

const Products = () => {
  return (
    <div className="flex size-full flex-col gap-6 rounded-t-lg border bg-primary-foreground p-4">
      <div>
        <Heading3 className="font-bold text-primary">Inventory</Heading3>
        <p className="font-medium">
          Manage your Products and view their details.
        </p>
      </div>
      <div className="size-full">
        {/* <NoProducts /> */}
        <ProductManage />
      </div>
    </div>
  );
};

export default Products;
