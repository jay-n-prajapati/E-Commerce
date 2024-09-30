import { queryClient } from '@/providers/QueryClientProvider';
import useCustomToast from '@/hooks/useCustomToast';
import { ITag } from '@/models/tag.model';
import { useMutation } from '@tanstack/react-query';
import useAppData from '@/hooks/useAppData';
import { deletedTag } from '@/lib/network/services/tags';

export default function useTags() {
  const { showToast } = useCustomToast();
  const { tags, tagsLoading } = useAppData();

  const { mutateAsync: deletedTagMutation } = useMutation({
    mutationKey: ['tag'],
    mutationFn: (id: string) => deletedTag(id),
    onSuccess(res, id) {
      if (res.success) {
        const oldTags = queryClient.getQueryData<ITag[]>(['tags']);
        const updatedTagsData = oldTags?.filter((tag) => tag.id !== id);
        queryClient.setQueryData(['tags'], () => updatedTagsData);
      }
    },
  });

  const handleDeleteTag = async (id: string) => {
    const res = await deletedTagMutation(id);

    if (res.success) {
      showToast('success', 'Success', res.message);
      return true;
    } else if (res.status === 500) {
      showToast('destructive', 'Error!', res.message);
      return false;
    } else {
      showToast('warn', 'Warning!', res.message);
      return false;
    }
  };

  return { tags, tagsLoading, handleDeleteTag };
}
