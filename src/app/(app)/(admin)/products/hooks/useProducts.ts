import { queryCLient } from '@/components/providers/QueryClientProvider';
import { IApiResponse, ISelectItems } from '@/constants/interfaces';
import useCustomToast from '@/hooks/useCustomToast';
import { axiosInstance } from '@/lib/network';
import { ICategory } from '@/models/category.model';
import { IProduct } from '@/models/product.model';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const useProducts = () => {
  const { showToast } = useCustomToast();

  // get all Product
  const getProducts = async () => {
    const { data } = await axiosInstance.get<IApiResponse<IProduct[]>>(
      '/product/getAllProduct'
    );
    return data.data;
  };

  const { data: productsData, isLoading: productsLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  // get all categories
  const getCategories = async () => {
    const { data } = await axiosInstance.get<IApiResponse<ICategory[]>>(
      '/category/getAllCategory'
    );
    return data.data;
  };

  const { data: categoryData } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const [categories, setCategories] = useState<ISelectItems[]>([]);
  useEffect(() => {
    if (categoryData) {
      const categoriesData = categoryData.map((category) => ({
        label: category.name,
        value: category.name,
      }));
      setCategories(categoriesData);
    }
  }, [categoryData]);

  // upsertProduct mutation
  const postProduct = async (product: IProduct) => {
    try {
      const {
        id,
        name,
        description,
        price,
        imageUrls,
        thumbnailUrl,
        category,
        stockQuantity,
      } = product;

      const { data } = await axiosInstance.post<IApiResponse<IProduct>>(
        '/product/saveProduct',
        {
          id,
          name,
          description,
          price,
          imageUrls,
          thumbnailUrl,
          category,
          stockQuantity,
        }
      );

      return data;
    } catch (error) {
      console.error('Error upserting product:', error);
      return null;
    }
  };

  const { mutateAsync: upsertProduct, isPending: upsertProductLoading } =
    useMutation({
      mutationFn: postProduct,
    });

  const saveProduct = async (product: IProduct) => {
    const res = await upsertProduct(product);
    if (!res?.success) {
      showToast('destructive', 'Error!', res?.message);
      return false;
    }
    showToast('success', 'Success!', res.message);
    return true;
  };

  // delete product mutation

  const deleteProduct = async (id: string) => {
    const { data } = await axiosInstance.delete<IApiResponse<IProduct>>(
      `/product/deleteProduct/${id}`
    );
    return data;
  };

  const { mutateAsync: deleteProductMutation } = useMutation({
    mutationKey: ['products'],
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess(res, id) {
      if (res.success) {
        const oldProducts = queryCLient.getQueryData<IProduct[]>(['products']);

        const updatedProductsData = oldProducts?.filter(
          (product) => product.id !== id
        );
        queryCLient.setQueryData(['products'], () => updatedProductsData);
      }
    },
  });

  const deleteProd = async (id: string) => {
    const res = await deleteProductMutation(id);
    if (!res.success) {
      showToast('warn', 'Warning', res.message);
      return false;
    } else {
      showToast('success', 'Success!', res.message);
      return true;
    }
  };

  return {
    categoriesData: categories,
    productsData: productsData ?? [],
    productsLoading,
    upsertProductLoading,
    saveProduct,
    deleteProd,
  };
};

export default useProducts;
