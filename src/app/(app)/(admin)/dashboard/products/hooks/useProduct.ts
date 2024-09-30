'use client';

import { getProduct } from '@/lib/network/services/products';
import { useQuery } from '@tanstack/react-query';

export default function useProduct(productId: string) {
  const { data: productData, isLoading: productDataLoading } = useQuery({
    queryKey: ['product'],
    queryFn: () => getProduct(productId),
  });

  return { productData, productDataLoading };
}
