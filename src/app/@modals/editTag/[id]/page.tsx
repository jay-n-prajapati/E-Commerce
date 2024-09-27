'use client';

import useTag from './useTag';
import { useRouter } from 'next/navigation';
import ECommerceModal from '@/components/ui/common/ECommerceModal';
import UpsertTagForm from '@/components/custom/UpsertTag/UpsertTagForm';

export default function Page({ params }: { params: { id: string } }) {
  const { tagData } = useTag(params.id);
  const router = useRouter();
  return (
    <ECommerceModal
      title="Edit Tag"
      description="You can add or edit your Tags here."
      onClose={() => router.back()}
    >
      <UpsertTagForm
        initialValues={{
          id: tagData?.id as string,
          name: tagData?.name as string,
          description: tagData?.description,
        }}
        closeModal={() => router.back()}
        key={tagData?.name}
      />
    </ECommerceModal>
  );
}
