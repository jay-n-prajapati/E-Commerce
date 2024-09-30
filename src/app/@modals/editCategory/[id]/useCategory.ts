import { getCategory } from '@/lib/network/services/categories';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function useCategory(id: string) {
  const router = useRouter();

  const { data: category } = useQuery({
    queryKey: ['category'],
    queryFn: () => getCategory(id),
  });

  return { category, router };
}
