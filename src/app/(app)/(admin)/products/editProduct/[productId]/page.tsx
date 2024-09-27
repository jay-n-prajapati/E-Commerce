'use client';

import Heading4 from '@/components/ui/headings/Heading4';
import ProductForm from '../../components/ProductForm';
import useProduct from '../../hooks/useProduct';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { Suspense } from 'react';

export default function Page({ params }: { params: { productId: string } }) {
  const { productData } = useProduct(params.productId);

  return (
    <Suspense>
      <div className="flex h-full flex-col gap-4">
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
          <Heading4 className="font-bold">Edit Product</Heading4>
        </div>

        <ProductForm initialValues={productData!} key={productData?.name} />
      </div>
    </Suspense>
  );
}
