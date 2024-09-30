import { queryClient } from '@/providers/QueryClientProvider';
import useCustomToast from '@/hooks/useCustomToast';
import { ICategory } from '@/models/category.model';
import { useMutation } from '@tanstack/react-query';
import {
  createCategory,
  editCategory,
} from '@/lib/network/services/categories';

const useCategoryMutation = () => {
  const { showToast } = useCustomToast();

  const { mutateAsync: upsertCategory, isPending: upsertCategoryLoading } =
    useMutation({
      mutationFn: ({ id, name, slug }: ICategory) => {
        // Check if the operation is for edit or create
        if (id) return editCategory(id as string, name, slug);
        return createCategory(name, slug);
      },
      onSuccess: (res, { id }) => {
        if (res.success) {
          const oldCategories = queryClient.getQueryData<ICategory[]>([
            'categories',
          ]);

          if (id) {
            // If it's an edit, update the existing category in the cache
            queryClient.setQueryData(['categories'], () =>
              oldCategories?.map((category) =>
                category.id === id ? res.data : category
              )
            );
          } else {
            // If it's a create, add the new category to the cache
            queryClient.setQueryData(['categories'], () => [
              ...(oldCategories as ICategory[]),
              res.data,
            ]);
          }
        }
      },
    });

  const saveCategory = async (name: string, slug: string, id: string) => {
    const res = await upsertCategory({
      id,
      name,
      slug,
    });

    if (!res.success) {
      showToast('warn', 'Warning!', res.message);
      return false;
    } else {
      showToast('success', 'Success', res.message);
      return true;
    }
  };

  return { saveCategory, upsertCategoryLoading };
};

export default useCategoryMutation;
