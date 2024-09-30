'use client';

import ECommerceTable from '@/components/ui/common/ECommerceTable';
import Heading5 from '@/components/ui/headings/Heading5';
import React, { useMemo } from 'react';
import { getTagsColumn } from './columns/TagsColumn';
import { useRouter } from 'next/navigation';
import useTags from '../hooks/useTags';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CirclePlus } from 'lucide-react';

export default function Tags() {
  const router = useRouter();
  const { tags, tagsLoading, handleDeleteTag } = useTags();

  const tagsColumn = useMemo(
    () =>
      getTagsColumn(
        async (id) => await handleDeleteTag(id),
        (id) => router.push(`/editTag/${id}`)
      ),
    []
  );

  return (
    <div className="flex flex-col gap-4 border p-5 lg:basis-1/2">
      <div className="flex items-center justify-between">
        <Heading5>Tags</Heading5>
        <Link href={'/addTag'}>
          <Button type="button" size={'sm'}>
            <CirclePlus className="size-4" />
            Add Tag
          </Button>
        </Link>
      </div>{' '}
      <div className="flex-grow">
        <ECommerceTable
          data={tags ?? []}
          columns={tagsColumn}
          loading={tagsLoading}
        />
      </div>
    </div>
  );
}
