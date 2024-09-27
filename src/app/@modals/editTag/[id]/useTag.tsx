import { IApiResponse } from '@/constants/interfaces';
import { axiosInstance } from '@/lib/network';
import { ITag } from '@/models/tag.model';
import { useQuery } from '@tanstack/react-query';

export default function useTag(id: string) {
  const getTag = async () => {
    const { data } = await axiosInstance.post<IApiResponse<ITag>>(`/tag/${id}`);
    return data.data;
  };
  const { data: tagData } = useQuery({
    queryKey: ['tag'],
    queryFn: getTag,
  });
  return { tagData };
}
