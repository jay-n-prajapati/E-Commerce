'use client';

import React from 'react';
import useProduct from '../hooks/useProduct';
import ECommerceTable from '@/components/ui/common/ECommerceTable';
import { productsColumns } from './columns/ProductsColumn';
import { IProduct } from '@/models/product.model';

const ProductManage = () => {
  const { productsData, productsLoading } = useProduct();
  return (
    <div className="size-full">
      <ECommerceTable
        data={productsData as IProduct[]}
        columns={productsColumns}
        loading={productsLoading}
        containerClassName="min-h-full"
      />
    </div>
  );
};

export default ProductManage;
