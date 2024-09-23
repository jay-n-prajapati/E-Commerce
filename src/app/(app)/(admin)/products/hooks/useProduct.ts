import { IApiResponse, ISelectItems } from '@/constants/interfaces';
import useCustomToast from '@/hooks/useCustomToast';
import { axiosInstance } from '@/lib/network';
import { ICategory } from '@/models/category.model';
import { IProduct } from '@/models/product.model';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const useProduct = () => {
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
    const { data } = await axiosInstance.get('/category/getAllCategory');
    return data.data;
  };

  const { data: categoryData } = useQuery<
    IApiResponse<ICategory[]>,
    unknown,
    ICategory[]
  >({
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
  const postProduct = async (product: IProduct & { id?: string }) => {
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

      const { data } = await axiosInstance.post('/product/saveProduct', {
        id,
        name,
        description,
        price,
        imageUrls,
        thumbnailUrl,
        category,
        stockQuantity,
      });

      return data;
    } catch (error) {
      console.error('Error upserting product:', error);
      return null;
    }
  };

  const { mutateAsync: upsertProduct, isPending: upsertProductLoading } =
    useMutation<
      IApiResponse<IProduct & { id?: string }>,
      unknown,
      IProduct & { id?: string }
    >({
      mutationFn: postProduct,
    });

  const saveProduct = async (product: IProduct & { id?: string }) => {
    const res = await upsertProduct(product);
    if (!res.success) {
      showToast('destructive', 'Error!', res.message);
      return false;
    }
    showToast('success', 'Success!', res.message);
    return true;
  };

  return {
    categoriesData: categories,
    productsData: productsData ?? [],
    productsLoading,
    upsertProductLoading,
    saveProduct,
  };
};

export default useProduct;
