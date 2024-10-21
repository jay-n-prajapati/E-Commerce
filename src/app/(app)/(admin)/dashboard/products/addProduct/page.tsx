import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import Heading4 from '@/components/ui/headings/Heading4';
import ProductForm from '../components/ProductForm';

const page = () => {
  return (
    <div className="flex flex-grow flex-col gap-4">
      <div className="flex items-center gap-4">
        <Link href={'/dashboard/products'}>
          <Button
            size={'icon'}
            variant={'outline'}
            className="size-7 bg-primary-foreground"
          >
            <ChevronLeft className="size-4" />
          </Button>
        </Link>
        <Heading4 className="font-bold">Create New Product</Heading4>
      </div>
      <ProductForm
        initialValues={{
          id: '',
          category: '',
          brand: '',
          description: '',
          imageUrls: [],
          tags: [],
          name: '',
          price: '0',
          stockQuantity: '0',
          thumbnailUrl: '',
        }}
      />
    </div>
  );
};

export default page;
