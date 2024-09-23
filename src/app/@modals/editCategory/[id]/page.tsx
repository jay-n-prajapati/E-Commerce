'use client';

import ECommerceModal from '@/components/ui/common/ECommerceModal';
import UpsertCategoryForm from '@/components/custom/UpsertCategory/UpsertCategoryForm';
import useCategory from './useCategory';
import { Suspense } from 'react';
import Loading from '@/app/loading';

const Page = ({ params }: { params: { id: string } }) => {
  const { category, router } = useCategory(params.id);

  return (
    <Suspense fallback={<Loading />}>
      <ECommerceModal
        title="Edit Category"
        description="You can Add or Edit your category here."
        onClose={() => router.back()}
      >
        <UpsertCategoryForm
          initialValues={{
            id: params.id,
            name: category?.name as string,
            slug: category?.slug as string,
          }}
          closeModal={() => router.back()}
          key={category?.name}
        />
      </ECommerceModal>
    </Suspense>
  );
};

export default Page;
