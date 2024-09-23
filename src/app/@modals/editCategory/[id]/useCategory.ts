import { IApiResponse } from '@/constants/interfaces';
import { axiosInstance } from '@/lib/network';
import { ICategory } from '@/models/category.model';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function useCategory(id: string) {
  const router = useRouter();

  const getCategory = async () => {
    const { data } = await axiosInstance.post<IApiResponse<ICategory>>(
      '/category/getCategory',
      {
        id,
      }
    );
    return data.data;
  };

  const { data: category } = useQuery({
    queryKey: ['category'],
    queryFn: getCategory,
  });

  return { category, router };
}
