import { Button } from '@/components/ui/button';
import { ECommerceForm } from '@/components/ui/common/ECommerceForm';
import { z } from 'zod';
import useTagsMutation from './useTagsMutation';

const tagFormSchema = z.object({
  name: z.string().min(3, '* min. 3 characters are required.'),
  description: z.string().optional(),
});

interface IProps {
  initialValues: z.infer<typeof tagFormSchema> & { id?: string };
  closeModal: () => void;
}

export default function UpsertTagForm({ initialValues, closeModal }: IProps) {
  const { upsertTag, upsertTagLoading } = useTagsMutation();
  async function handleSaveTag(name: string, description: string) {
    const res = await upsertTag(name, description, initialValues.id);
    if (res) closeModal();
  }

  return (
    <ECommerceForm<z.infer<typeof tagFormSchema>>
      elements={[
        {
          key: 'name',
          label: 'Tag Name',
          type: 'input',
          placeholder: 'eg. sports shoes',
        },
        {
          key: 'description',
          label: 'Tag description (Optional)',
          type: 'textarea',
          placeholder: 'eg. tag info',
        },
      ]}
      initialValues={initialValues}
      formSchema={tagFormSchema}
      onSubmit={(e) => handleSaveTag(e.name, e.description as string)}
    >
      <Button
        type="submit"
        isLoading={upsertTagLoading}
        disabled={upsertTagLoading}
      >
        Save
      </Button>
    </ECommerceForm>
  );
}
