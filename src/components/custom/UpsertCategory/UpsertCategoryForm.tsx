import { Button } from '@/components/ui/button';
import { ECommerceForm } from '@/components/ui/common/ECommerceForm';
import React from 'react';
import { generateSlug } from '@/lib/utils';
import { z } from 'zod';
import useCategoryMutation from './useCategoryMutation';

const categoryFormSchema = z.object({
  name: z.string().min(3, '* minimum 3 character required'),
  slug: z
    .string()
    .min(3, { message: '* minimum 3 character required' })
    .regex(/^[a-z0-9-]+$/, {
      message: 'Slug can only contain lowercase letters, numbers, and hyphens',
    }) // Allow only lowercase letters, numbers, and hyphens
    .max(40, { message: 'Slug cannot be longer than 40 characters' }),
});

export default function UpsertCategoryForm({
  initialValues = { name: '', slug: '', id: '' },
  closeModal,
}: {
  initialValues: z.infer<typeof categoryFormSchema> & { id?: string };
  closeModal: () => void;
}) {
  const { saveCategory, upsertCategoryLoading } = useCategoryMutation();

  const handleSaveCategory = async (name: string, slug: string) => {
    const res = await saveCategory(name, slug, initialValues.id!);
    if (res) closeModal();
  };

  return (
    <ECommerceForm<z.infer<typeof categoryFormSchema>>
      elements={[
        {
          label: 'Name',
          type: 'input',
          placeholder: 'Category Name',
          key: 'name',
          syncKey: 'name',
          syncWith: [
            {
              syncWithKey: 'slug',
              transformFunction: generateSlug,
            },
          ],
        },
        {
          label: 'Slug',
          type: 'input',
          placeholder: 'Category Slug',
          key: 'slug',
        },
      ]}
      formSchema={categoryFormSchema}
      initialValues={initialValues}
      onSubmit={(e) => handleSaveCategory(e.name, e.slug)}
    >
      <Button
        type="submit"
        disabled={upsertCategoryLoading}
        isLoading={upsertCategoryLoading}
      >
        Save
      </Button>
    </ECommerceForm>
  );
}
