import { queryClient } from '@/providers/QueryClientProvider';
import useCustomToast from '@/hooks/useCustomToast';
import { ICategory } from '@/models/category.model';
import { useMutation } from '@tanstack/react-query';
import useAppData from '@/hooks/useAppData';
import { deleteCategory } from '@/lib/network/services/categories';

export default function useCategories() {
  const { showToast } = useCustomToast();
  const { categories, categoriesLoading } = useAppData();

  // delete Category
  const {
    mutateAsync: deleteCategoryMutation,
    isPending: deleteCategoryLoading,
  } = useMutation({
    mutationFn: (id: string) => deleteCategory(id),
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
    categories,
    categoriesLoading,
    deleteCategoryLoading,
    deleteCat,
  };
}
