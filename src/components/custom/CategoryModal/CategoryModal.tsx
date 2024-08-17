import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import React, { useState } from 'react';
import Heading4 from '../../ui/headings/Heading4';
import { ECommerceForm } from '../../ui/common/ECommerceForm';
import { Button } from '../../ui/button';
import { z } from 'zod';
import { generateSlug } from '@/lib/utils';
import useCategory from './useCategory';

const categoryFormSchema = z.object({
  name: z.string().min(3, '* minimum 3 character required'),
  slug: z
    .string()
    .min(3, { message: '* minimum 3 character required' })
    .regex(/^[a-z0-9-]+$/, {
      message: 'Slug can only contain lowercase letters, numbers, and hyphens',
    }) // Allow only lowercase letters, numbers, and hyphens
    .max(15, { message: 'Slug cannot be longer than 15 characters' }),
});

const CategoryModal = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const { saveCategory, upsertCategoryLoading } = useCategory();

  const handleSaveCategory = async (name: string, slug: string) => {
    const res = await saveCategory(name, slug);
    if (res) {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger onClick={() => setOpen(true)}>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Heading4>Create Category</Heading4>
          </DialogTitle>
          <DialogDescription>
            You can Add or Edit your category here.
          </DialogDescription>
        </DialogHeader>
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
          initialValues={{ name: '', slug: '' }}
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
      </DialogContent>
    </Dialog>
  );
};

export default CategoryModal;
