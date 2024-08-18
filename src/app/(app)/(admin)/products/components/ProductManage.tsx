'use client';

import { Button } from '@/components/ui/button';
import { CirclePlus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import useProduct from '../hooks/useProduct';
import ECommerceTable from '@/components/ui/common/ECommerceTable';
import { productsColumns } from './ProductsColumn';
import { IProduct } from '@/models/product.model';

const ProductManage = () => {
  const { productsData } = useProduct();
  return (
    <div className="flex size-full flex-col gap-4">
      <div className="flex justify-end">
        <Link href={'/products/addProduct'}>
          <Button className="font-bold">
            <CirclePlus className="size-5" /> Add Product
          </Button>
        </Link>
      </div>
      <div>
        <ECommerceTable
          data={productsData as IProduct[]}
          columns={productsColumns}
        />
      </div>
    </div>
  );
};

export default ProductManage;
