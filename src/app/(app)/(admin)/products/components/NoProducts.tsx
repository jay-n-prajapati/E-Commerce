import { Button } from '@/components/ui/button';
import Heading4 from '@/components/ui/headings/Heading4';
import React from 'react';
import Link from 'next/link';
import { CirclePlus } from 'lucide-react';

const NoProducts = () => {
  return (
    <>
      <div className="flex size-full items-center justify-center rounded-lg border border-dashed border-primary p-6">
        <div className="flex flex-col items-center gap-4">
          <div className="text-center">
            <Heading4 className="font-bold text-secondary-foreground">
              You have no products
            </Heading4>
            <p className="text-muted-foreground">
              You can start selling as soon as you add a product.
            </p>
          </div>
          <div>
            <Link href={'/products/addProduct'}>
              <Button className="font-bold">
                <CirclePlus className="size-5" /> Add Product
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoProducts;
