import { AppDataContext } from '@/contexts/AppDataContext';
import { useContext } from 'react';

export default function useAppData() {
  const { categories, tags, categoriesLoading, tagsLoading } =
    useContext(AppDataContext);
  return {
    categories,
    categoriesLoading,
    tags,
    tagsLoading,
  };
}
