import { queryClient } from '@/providers/QueryClientProvider';
import useCustomToast from '@/hooks/useCustomToast';
import { ITag } from '@/models/tag.model';
import { useMutation } from '@tanstack/react-query';
import { saveTag } from '@/lib/network/services/tags';

export default function useTagsMutation() {
  const { showToast } = useCustomToast();

  const { mutateAsync: upsertTagMutation, isPending: upsertTagLoading } =
    useMutation({
      mutationFn: ({ name, description, id }: ITag) =>
        saveTag(name, description as string, id as string),
      onSuccess(res, { id }) {
        if (res.success) {
          const oldTags = queryClient.getQueryData<ITag[]>(['tags']) ?? [];

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
