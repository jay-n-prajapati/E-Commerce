import { IApiResponse } from '@/constants/interfaces';
import { axiosInstance } from '@/lib/network';
import { ICategory } from '@/models/category.model';
import { useQuery } from '@tanstack/react-query';

export default function useCategories() {
  // get all categories
  const getCategories = async () => {
    const { data } = await axiosInstance.get('/category/getAllCategory');
    return data.data;
  };
  const { data: categoriesData, isLoading: categoriesDataLoading } = useQuery<
    IApiResponse<ICategory[]>,
    unknown,
    ICategory[]
  >({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
  return {
    categoriesData,
    categoriesDataLoading,
  };
}
