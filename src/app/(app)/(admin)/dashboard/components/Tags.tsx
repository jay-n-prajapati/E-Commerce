'use client';

import ECommerceTable from '@/components/ui/common/ECommerceTable';
import Heading5 from '@/components/ui/headings/Heading5';
import React, { useMemo } from 'react';
import { getTagsColumn } from './columns/TagsColumn';
import { axiosInstance } from '@/lib/network';
import { IApiResponse } from '@/constants/interfaces';
import { ITag } from '@/models/tag.model';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function Tags() {
  const router = useRouter();
  const tagsColumn = useMemo(
    () =>
      getTagsColumn(
        async (id) => {
          console.log(id);
          return true;
        },
        (id) => router.push(`/editTag/${id}`)
      ),
    []
  );
  const getTags = async () => {
    const { data } =
      await axiosInstance.get<IApiResponse<ITag[]>>('/tag/getAllTags');
    return data.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ['tags'],
    queryFn: getTags,
  });

  return (
    <div className="flex flex-col gap-4 border p-5 lg:basis-1/2">
      <Heading5>Tags</Heading5>
      <div className="flex-grow">
        <ECommerceTable
          data={data ?? []}
          columns={tagsColumn}
          loading={isLoading}
        />
      </div>
    </div>
  );
}
