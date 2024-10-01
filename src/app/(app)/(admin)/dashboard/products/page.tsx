import React from 'react';
import ProductManage from './components/ProductManage';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CirclePlus } from 'lucide-react';
import ECommerceDashboardPageHeader from '@/components/ui/common/ECommerceDashboardPageHeader';
// import NoProducts from './components/NoProducts';

const Products = () => {
  return (
    <div className="flex h-full flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <ECommerceDashboardPageHeader
          title="Products"
          descriptions="Manage your Products here"
        />
        <Link href={'/dashboard/products/addProduct'}>
          <Button className="font-bold">
            <CirclePlus className="size-5" /> Add Product
          </Button>
        </Link>
      </div>
      <div className="flex h-full flex-col">
        {/* <NoProducts /> */}
        <ProductManage />
      </div>
    </div>
  );
};

export default Products;
