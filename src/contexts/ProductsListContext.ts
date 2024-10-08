'use client';

import { ProductListData } from '@/constants/interfaces';
import { createContext } from 'react';

export interface Filters {
  search?: string;
  sort?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  page?: number;
  limit?: number;
  tags?: string[];
}

export interface ProductsListContextProps {
  productsData: ProductListData;
  productsListLoading?: boolean;
  filters: Filters;
  updateFilters: (_key: keyof Filters, _value: Filters[keyof Filters]) => void;
}

export const ProductsListContext = createContext<ProductsListContextProps>({
  productsData: { products: [], maxPrice: 0, pagination: {} },
  filters: {
    search: '',
    sort: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    page: 1,
    limit: 10,
    tags: [],
  },
  updateFilters: () => {},
});
