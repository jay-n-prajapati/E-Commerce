'use client';

import ECommerceTable from '@/components/ui/common/ECommerceTable';
import Heading5 from '@/components/ui/headings/Heading5';
import React from 'react';
import { getCategoryColumns } from './columns/CategoryColumns';
import { Button } from '@/components/ui/button';
import { CirclePlus } from 'lucide-react';
import Link from 'next/link';
import useCategories from '../hooks/useCategories';
import { useRouter } from 'next/navigation';

export default function Categories() {
  const router = useRouter();
  const { categoriesData, categoriesDataLoading } = useCategories();

  const categoryColumn = getCategoryColumns(
    (id) => router.push(`/editCategory/${id}`),
    () => {}
  );

  return (
    <div className="flex flex-col gap-4 border p-5 lg:basis-2/5">
      <div className="flex items-center justify-between">
        <Heading5>Categories</Heading5>
        <Link href={'/addCategory'}>
          <Button type="button" size={'sm'}>
            <CirclePlus className="size-4" />
            Add Category
          </Button>
        </Link>
      </div>
      <div className="flex-grow">
        <ECommerceTable
          data={categoriesData ?? []}
          columns={categoryColumn}
          loading={categoriesDataLoading}
          containerClassName="max-h-96"
        />
      </div>
    </div>
  );
}
