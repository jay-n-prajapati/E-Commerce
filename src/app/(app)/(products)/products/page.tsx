'use client';

import useProductsList from '@/hooks/useProductsList';
import ECommerceProductCard from '@/components/ui/common/ECommerceProductCard';
import { Key } from 'react';
import Loading from '@/app/loading';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Heading5 from '@/components/ui/headings/Heading5';
import Heading4 from '@/components/ui/headings/Heading4';

export default function Page() {
  const {
    productsData,
    productsListLoading,
    filters: { page },
    updateFilters,
  } = useProductsList();

  return (
    <div className="flex h-fit min-h-96 flex-grow flex-col gap-4">
      <div className="grid flex-grow grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {productsListLoading && <Loading />}
        {productsData.pagination.totalProducts
          ? productsData.products.map((product) => (
              <ECommerceProductCard key={product.id as Key} product={product} />
            ))
          : !productsListLoading && (
              <Heading4 className="pt-4">No Product Available...</Heading4>
            )}
      </div>
      {!!productsData.pagination.totalPages && (
        <div className="flex items-center justify-center py-6">
          <div className="flex items-center gap-2">
            <Button
              size={'icon'}
              variant={'outline'}
              disabled={page === 1}
              onClick={() => updateFilters('page', page! - 1)}
            >
              <ChevronLeft />
            </Button>
            <Heading5>{`${page} of ${productsData.pagination.totalPages ?? 1}`}</Heading5>
            <Button
              size={'icon'}
              variant={'outline'}
              disabled={
                page === productsData.pagination.totalPages ||
                !productsData.pagination.totalPages
              }
              onClick={() => updateFilters('page', page! + 1)}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
