import { queryClient } from '@/providers/QueryClientProvider';
import { ISelectItems } from '@/constants/interfaces';
import useCustomToast from '@/hooks/useCustomToast';
import { IProduct } from '@/models/product.model';
import { useMutation } from '@tanstack/react-query';
import useAppData from '@/hooks/useAppData';
import { useEffect, useState } from 'react';
import { deleteProduct, postProduct } from '@/lib/network/services/products';

export default function useProductsMutation() {
  const { showToast } = useCustomToast();
  const { categories: categoryData, tags: tagData } = useAppData();

  const [categories, setCategories] = useState<ISelectItems[]>([]);
  const [tags, setTags] = useState<ISelectItems[]>([]);

  useEffect(() => {
    if (categoryData) {
      const categoriesData = categoryData.map((category) => ({
        label: category.name,
        value: category.name,
      }));

      setCategories(categoriesData);
    }

    if (tagData) {
      const tagsData = tagData?.map((tag) => ({
        label: tag.name,
        value: tag.name,
      }));
      setTags(tagsData);
    }
  }, [categoryData, tagData]);

  // upsertProduct mutation

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
    showToast('success', 'Success', res.message);
    return true;
  };

  // delete product mutation

  const { mutateAsync: deleteProductMutation } = useMutation({
    mutationKey: ['products'],
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess(res, id) {
      if (res.success) {
        const oldProducts = queryClient.getQueryData<IProduct[]>(['products']);

        const updatedProductsData = oldProducts?.filter(
          (product) => product.id !== id
        );
        queryClient.setQueryData(['products'], () => updatedProductsData);
      }
    },
  });

  const deleteProd = async (id: string) => {
    const res = await deleteProductMutation(id);
    if (!res.success) {
      showToast('warn', 'Warning!', res.message);
      return false;
    } else {
      showToast('success', 'Success', res.message);
      return true;
    }
  };
  return {
    tagData: tags,
    categoriesData: categories,
    upsertProductLoading,
    saveProduct,
    deleteProd,
  };
}
