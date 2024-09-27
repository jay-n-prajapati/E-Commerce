import React from 'react';
// import NoProducts from './components/NoProducts';
import ProductManage from './components/ProductManage';
import Heading2 from '@/components/ui/headings/Heading2';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CirclePlus } from 'lucide-react';

const Products = () => {
  return (
    <div className="flex h-full flex-col gap-6 rounded-lg border bg-primary-foreground p-6">
      <div className="flex items-center justify-between">
        <div>
          <Heading2 className="font-bold text-primary">Inventory</Heading2>
          <p className="font-medium">
            Manage your Products and view their details.
          </p>
        </div>
        <Link href={'/products/addProduct'}>
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
