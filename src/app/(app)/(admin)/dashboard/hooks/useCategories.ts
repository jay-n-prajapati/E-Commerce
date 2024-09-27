import { queryClient } from '@/components/providers/QueryClientProvider';
import { IApiResponse } from '@/constants/interfaces';
import useCustomToast from '@/hooks/useCustomToast';
import { axiosInstance } from '@/lib/network';
import { ICategory } from '@/models/category.model';
import { useMutation, useQuery } from '@tanstack/react-query';

export default function useCategories() {
  const { showToast } = useCustomToast();

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

  // delete Category
  const deleteCategory = async (id: string) => {
    const { data } = await axiosInstance.delete(
      `/category/deleteCategory/${id}`
    );
    return data;
  };

  const {
    mutateAsync: deleteCategoryMutation,
    isPending: deleteCategoryLoading,
  } = useMutation<IApiResponse<ICategory>, unknown, string>({
    mutationFn: (id) => deleteCategory(id),
    onSuccess(res, id) {
      if (res.success) {
        const oldCategories = queryClient.getQueryData<ICategory[]>([
          'categories',
        ]);

        const updatedCategoryData = oldCategories?.filter(
          (category) => category.id !== id
        );
        queryClient.setQueryData(['categories'], () => updatedCategoryData);
      }
    },
  });

  const deleteCat = async (id: string) => {
    const res = await deleteCategoryMutation(id);

    if (!res.success) {
      showToast('warn', 'Warning!', res.message);
      return false;
    } else {
      showToast('success', 'Success', res.message);
      return true;
    }
  };

  return {
    categoriesData,
    categoriesDataLoading,
    deleteCategoryLoading,
    deleteCat,
  };
}
