import { queryCLient } from '@/components/ui/providers/QueryClientProvider';
import { IApiResponse } from '@/constants/interfaces';
import useCustomToast from '@/hooks/useCustomToast';
import { axiosInstance } from '@/lib/network';
import { ICategory } from '@/models/category.model';
import { useMutation } from '@tanstack/react-query';

const useCategory = () => {
  const { showToast } = useCustomToast();
  const postCategory = async (name: string, slug: string) => {
    const { data } = await axiosInstance.post('/category/addCategory', {
      name,
      slug,
    });
    return data;
  };

  const { mutateAsync: upsertCategory, isPending: upsertCategoryLoading } =
    useMutation<IApiResponse<ICategory>, unknown, ICategory>({
      mutationFn: ({ name, slug }: { name: string; slug: string }) =>
        postCategory(name, slug),
      onSuccess: (res) => {
        if (res.success) {
          const oldCategories = queryCLient.getQueryData<ICategory[]>([
            'categories',
          ]);
          queryCLient.setQueryData(['categories'], () => [
            ...(oldCategories as ICategory[]),
            res.data,
          ]);
        }
      },
    });

  const saveCategory = async (name: string, slug: string) => {
    const res = await upsertCategory({
      name,
      slug,
    });

    if (!res.success) {
      showToast('warn', 'Warning!', res.message);
      return false;
    } else {
      showToast('success', 'Success!', res.message);
      return true;
    }
  };

  return { saveCategory, upsertCategoryLoading };
};

export default useCategory;
