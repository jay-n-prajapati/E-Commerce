'use client';

import UpsertTagForm from '@/components/custom/UpsertTag/UpsertTagForm';
import ECommerceModal from '@/components/ui/common/ECommerceModal';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  return (
    <ECommerceModal
      title="Create Tag"
      description="You can add or edit your Tags here."
      onClose={() => router.back()}
    >
      <UpsertTagForm
        initialValues={{ name: '', description: '' }}
        closeModal={() => router.back()}
      />
    </ECommerceModal>
  );
}
