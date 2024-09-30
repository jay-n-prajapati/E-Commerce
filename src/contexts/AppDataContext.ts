'use client';

import { ICategory } from '@/models/category.model';
import { ITag } from '@/models/tag.model';
import { createContext } from 'react';

interface AppDataContextTypes {
  categories: ICategory[];
  categoriesLoading: boolean;
  tags: ITag[];
  tagsLoading: boolean;
}

export const AppDataContext = createContext<AppDataContextTypes>({
  categories: [],
  tags: [],
  categoriesLoading: false,
  tagsLoading: false,
});
