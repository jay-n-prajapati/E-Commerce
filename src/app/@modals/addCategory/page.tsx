'use client';

import React, { Suspense } from 'react';
import ECommerceModal from '@/components/ui/common/ECommerceModal';

import UpsertCategoryForm from '@/components/custom/UpsertCategory/UpsertCategoryForm';
import { useRouter } from 'next/navigation';
import Loading from '@/app/loading';

const Page = () => {
  const router = useRouter();
  return (
    <Suspense fallback={<Loading />}>
      <ECommerceModal
        title="Create Category"
        description="You can Add or Edit your category here."
        onClose={() => router.back()}
      >
        <UpsertCategoryForm
          initialValues={{ name: '', slug: '' }}
          closeModal={() => router.back()}
        />
      </ECommerceModal>
    </Suspense>
  );
};

export default Page;
