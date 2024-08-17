import { IApiResponse, ISelectItems } from '@/constants/interfaces';
import { axiosInstance } from '@/lib/network';
import { ICategory } from '@/models/category.model';
import { useQuery } from '@tanstack/react-query';
import { ObjectId } from 'mongoose';
import { useEffect, useState } from 'react';

const useProduct = () => {
  const getCategories = async () => {
    const { data } = await axiosInstance.get('/category/getAllCategory');
    return data.data;
  };

  const { data } = useQuery<IApiResponse<ICategory[]>, unknown, ICategory[]>({
    queryKey: ['categories'],
    queryFn: async () => await getCategories(),
  });

  const [categories, setCategories] = useState<ISelectItems[]>([]);

  useEffect(() => {
    if (data) {
      const categoriesData = data.map((category) => ({
        label: category.name,
        value: category._id as ObjectId,
      }));
      setCategories(categoriesData);
    }
  }, [data]);

  return { categoriesData: categories };
};

export default useProduct;
