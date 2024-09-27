'use client';

import { IApiResponse } from '@/constants/interfaces';
import { axiosInstance } from '@/lib/network';
import { IProduct } from '@/models/product.model';
import { useQuery } from '@tanstack/react-query';

export default function useProduct(productId: string) {
  // get product by id
  const getProduct = async () => {
    try {
      const { data } = await axiosInstance.get(`/product/${productId}`);
      return data.data;
    } catch (error) {
      console.log({ error });
    }
  };

  const { data: productData, isLoading: productDataLoading } = useQuery<
    IApiResponse<IProduct>,
    unknown,
    IProduct
  >({
    queryKey: ['product'],
    queryFn: getProduct,
  });

  return { productData, productDataLoading };
}
