'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CirclePlus } from 'lucide-react';
import ECommerceDashboardPageHeader from '@/components/ui/common/ECommerceDashboardPageHeader';
import NoProducts from './components/NoProducts';
import useProducts from './hooks/useProducts';
import useProductsMutation from './hooks/useProductsMutation';
import { getProductsColumn } from './components/columns/ProductsColumn';
import { useRouter } from 'next/navigation';
import ECommerceTable from '@/components/ui/common/ECommerceTable';
import { IProduct } from '@/models/product.model';

const Products = () => {
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
  }, [deleteProd, router]);

  return (
    <>
      <div className="flex items-center justify-between">
        <ECommerceDashboardPageHeader
          title="Products"
          descriptions="Manage your Products here"
        />
        {productsData.length > 0 && (
          <Link href={'/dashboard/products/addProduct'}>
            <Button className="font-bold">
              <CirclePlus className="size-5" /> Add Product
            </Button>
          </Link>
        )}
      </div>
      <div className="h-full flex-grow">
        {!productsData.length && !productsLoading ? (
          <NoProducts />
        ) : (
          <ECommerceTable
            data={productsData as IProduct[]}
            columns={productsColumns}
            loading={productsLoading}
          />
        )}
      </div>
    </>
  );
};

export default Products;
