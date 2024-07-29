'use client';

import Heading1 from '@/components/ui/headings/Heading1';
import Heading2 from '@/components/ui/headings/Heading2';
import Heading3 from '@/components/ui/headings/Heading3';
import { ECommerceForm } from '@/components/ui/common/ECommerceForm';
import { z } from 'zod';

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  suburb: z.string({
    required_error: 'Please select an email to display.',
  }),
});

export default function Home() {
  return (
    <>
      <Heading1 className="">Hello I am Jay</Heading1>
      <Heading2 className="">Hello I am Jay</Heading2>
      <Heading3 className="">Hello I am Jay</Heading3>
      <div>
        <ECommerceForm
          onSubmit={(e) => console.log(e)}
          formSchema={formSchema}
          className="mx-auto max-w-96"
          elements={[
            {
              type: 'input',
              label: 'Name',
              key: 'username',
              placeholder: 'Enter your name',
            },
            {
              type: 'select',
              label: 'Suburb',
              key: 'suburb',
              placeholder: 'select your name',
              selectItems: ['abc', 'xyz', 'pqr'],
            },
          ]}
        />
      </div>
    </>
  );
}
