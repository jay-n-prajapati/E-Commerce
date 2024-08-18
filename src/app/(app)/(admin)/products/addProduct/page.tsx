import React from 'react';
import AddProduct from './components/AddProduct';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import Heading4 from '@/components/ui/headings/Heading4';

const page = () => {
  return (
    <div>
      <div className="flex items-center gap-4">
        <Link href={'/products'}>
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
      <AddProduct />
    </div>
  );
};

export default page;
