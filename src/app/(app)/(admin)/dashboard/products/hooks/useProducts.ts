import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/lib/network/services/products';

const useProducts = () => {
  const { data: productsData, isLoading: productsLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  return {
    productsData: productsData ?? [],
    productsLoading,
  };
};

export default useProducts;
