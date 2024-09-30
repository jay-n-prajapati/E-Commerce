'use client';

import { AppDataContext } from '@/contexts/AppDataContext';
import { getCategories } from '@/lib/network/services/categories';
import { getTags } from '@/lib/network/services/tags';
import { ICategory } from '@/models/category.model';
import { ITag } from '@/models/tag.model';
import { useQuery } from '@tanstack/react-query';
import { ReactNode } from 'react';

export default function AppDataProvider({ children }: { children: ReactNode }) {
  // get all categories

  const { data: categoryData, isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  // get all tags
  const { data: tagData, isLoading: tagsLoading } = useQuery({
    queryKey: ['tags'],
    queryFn: getTags,
  });

  return (
    <AppDataContext.Provider
      value={{
        categories: categoryData as ICategory[],
        tags: tagData as ITag[],
        categoriesLoading,
        tagsLoading,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
}
