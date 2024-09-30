import { getTag } from '@/lib/network/services/tags';
import { useQuery } from '@tanstack/react-query';

export default function useTag(id: string) {
  const { data: tagData } = useQuery({
    queryKey: ['tag'],
    queryFn: () => getTag(id),
  });
  return { tagData };
}
