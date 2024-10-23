'use client';

import ECommerceSelect from '@/components/ui/common/ECommerceSelect';
import { Input } from '@/components/ui/input';
import React from 'react';
import FilterSidebarMobile from './FilterSidebarMobile';
import useProductsList from '@/hooks/useProductsList';

export default function ProductsHeader() {
  const {
    filters: { search, sort },
    updateFilters,
  } = useProductsList();

  return (
    <div className="mb-4 flex flex-col gap-4 lg:flex-row">
      <Input
        placeholder="search product..."
        value={search}
        onChange={(e) => updateFilters('search', e.target.value)}
      />
      <div className="flex gap-4 lg:basis-1/3">
        <ECommerceSelect
          placeholder="Sort by"
          value={sort ?? ''}
          selectItems={[
            { label: 'Newest First', value: 'createdAt:desc' },
            { label: 'Oldest First', value: 'createdAt:asc' },
            { label: 'Price: Low to High', value: 'price:asc' },
            { label: 'Price: High to Low', value: 'price:desc' },
          ]}
          onChange={(value) => updateFilters('sort', value)}
        />
        <FilterSidebarMobile />
      </div>
    </div>
  );
}
