'use client';

import React, { useMemo } from 'react';
import useProducts from '../hooks/useProducts';
import ECommerceTable from '@/components/ui/common/ECommerceTable';
import { getProductsColumn } from './columns/ProductsColumn';
import { IProduct } from '@/models/product.model';
import { useRouter } from 'next/navigation';
import useProductsMutation from '../hooks/useProductsMutation';

const ProductManage = () => {
  const router = useRouter();

  const { productsData, productsLoading } = useProducts();
  const { deleteProd } = useProductsMutation();
  const productsColumns = useMemo(() => {
    return getProductsColumn(
      (productId) =>
        router.push(`/dashboard/products/editProduct/${productId}`),
      async (productId) => await deleteProd(productId),
      (productId) => router.push(`/product/${productId}`)
    );
  }, []);

  return (
    <ECommerceTable
      data={productsData as IProduct[]}
      columns={productsColumns}
      loading={productsLoading}
    />
  );
};

export default ProductManage;
