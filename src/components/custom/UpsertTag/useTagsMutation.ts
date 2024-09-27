import { queryClient } from '@/components/providers/QueryClientProvider';
import { IApiResponse } from '@/constants/interfaces';
import useCustomToast from '@/hooks/useCustomToast';
import { axiosInstance } from '@/lib/network';
import { ITag } from '@/models/tag.model';
import { useMutation } from '@tanstack/react-query';

export default function useTagsMutation() {
  const { showToast } = useCustomToast();
  const saveTag = async (name: string, description: string, id?: string) => {
    const { data } = await axiosInstance.post<IApiResponse<ITag>>(
      '/tag/saveTag',
      {
        id,
        name,
        description,
      }
    );

    return data;
  };

  const { mutateAsync: upsertTagMutation, isPending: upsertTagLoading } =
    useMutation({
      mutationFn: ({ name, description, id }: ITag) =>
        saveTag(name, description as string, id as string),
      onSuccess(res, { id }) {
        if (res.success) {
          const oldTags = queryClient.getQueryData<ITag[]>(['tags']) ?? [];
          console.log({ id });

          if (id) {
            queryClient.setQueryData(['tags'], () =>
              oldTags?.map((tag) => (tag.id === id ? res.data : tag))
            );
          } else {
            queryClient.setQueryData(['tags'], () => [
              ...(oldTags as ITag[]),
              res.data,
            ]);
          }
        }
      },
    });

  const upsertTag = async (name: string, description: string, id?: string) => {
    const res = await upsertTagMutation({
      id: id as string,
      name,
      description,
    });

    console.log({ res });

    if (res.success) {
      showToast('success', 'Success', res.message);
      return true;
    } else {
      showToast('warn', 'Warning!', res.message);
      return false;
    }
  };

  return { upsertTag, upsertTagLoading };
}
