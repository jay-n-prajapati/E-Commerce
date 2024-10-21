'use client';

import { useState, ReactNode, useEffect, useMemo, useCallback } from 'react';
import { Filters, ProductsListContext } from '@/contexts/ProductsListContext';
import { axiosInstance } from '@/lib/network';
import { IApiResponse, ProductListData } from '@/constants/interfaces';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import useDebouncedValue from '@/hooks/useDebouncedValue';

export default function ProductListProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Combine filter-related states into a single object
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    sort: searchParams.get('sort') || '',
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    page: Number(searchParams.get('page')) || 1,
    limit: Number(searchParams.get('limit')) || 10,
    tags: searchParams.get('tags')?.split(',') || [],
  });

  const debouncedSearch = useDebouncedValue(filters.search, 500);
  const debouncedMinPrice = useDebouncedValue(filters.minPrice, 1000);
  const debouncedMaxPrice = useDebouncedValue(filters.maxPrice, 1000);

  // Memoize query params to avoid unnecessary recomputation
  const queryParams = useMemo(
    () => ({
      page: filters.page,
      limit: filters.limit,
      q: debouncedSearch,
      minPrice: debouncedMinPrice,
      maxPrice: debouncedMaxPrice,
      category: filters.category,
      sort: filters.sort,
      tags: filters.tags.toString(),
    }),
    [debouncedSearch, debouncedMinPrice, debouncedMaxPrice, filters]
  );

  // Fetch products with filters using react-query
  const getProducts = useCallback(async () => {
    const { data } = await axiosInstance.get<IApiResponse<ProductListData>>(
      '/products',
      {
        params: queryParams,
      }
    );
    return data.data;
  }, [queryParams]);

  const { data: productsData, isLoading: productsListLoading } = useQuery({
    queryKey: ['productList', queryParams],
    queryFn: getProducts,
    placeholderData: keepPreviousData,
  });

  // Effect to update the URL when filters change
  useEffect(() => {
    const queryString = new URLSearchParams({
      page: String(filters.page),
      limit: String(filters.limit),
      ...(debouncedSearch && { q: debouncedSearch }),
      ...(debouncedMinPrice && { minPrice: debouncedMinPrice }),
      ...(debouncedMaxPrice && { maxPrice: debouncedMaxPrice }),
      ...(filters.category && { category: filters.category }),
      ...(filters.sort && { sort: filters.sort }),
      ...(filters.tags.length && { tags: filters.tags.toString() }),
    });

    router.push(`/products?${queryString.toString()}`, { scroll: true });
  }, [debouncedSearch, debouncedMinPrice, debouncedMaxPrice, filters, router]);

  // Update max price from the API response

  useEffect(() => {
    if (productsData?.maxPrice) {
      setFilters((prev) => ({
        ...prev,
        maxPrice: productsData.maxPrice.toString(),
      }));
    }
  }, []);

  // A single function to handle filter changes
  const updateFilters = (key: string, value: Filters[keyof Filters]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    if (key !== 'page' && filters.page !== 1)
      setFilters((prev) => ({ ...prev, page: 1 }));
  };

  return (
    <ProductsListContext.Provider
      value={{
        productsData: (productsData as ProductListData) ?? {
          products: [],
          pagination: {},
        },
        productsListLoading,
        filters, // Passing the whole filters object
        updateFilters, // Pass a function to update filters
      }}
    >
      {children}
    </ProductsListContext.Provider>
  );
}
