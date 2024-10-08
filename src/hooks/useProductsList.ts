import { ProductsListContext } from '@/contexts/ProductsListContext';
import { useContext } from 'react';

export default function useProductsList() {
  const { filters, updateFilters, productsData, productsListLoading } =
    useContext(ProductsListContext);
  return {
    filters,
    updateFilters,
    productsData,
    productsListLoading,
  };
}
