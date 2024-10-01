'use client';
import { Badge } from '@/components/ui/badge';
import ProductImages from '../components/ProductImages';
import Heading5 from '@/components/ui/headings/Heading5';
import Heading3 from '@/components/ui/headings/Heading3';
import { Button } from '@/components/ui/button';
import { Heart, Minus, Plus, ShoppingCart } from 'lucide-react';
import useProduct from '@/app/(app)/(admin)/dashboard/products/hooks/useProduct';

const ProductDetail = ({ params }: { params: { productId: string } }) => {
  const { productData } = useProduct(params.productId);

  return (
    <div className="size-full">
      <div className="flex w-full flex-col gap-6 py-4 lg:flex-row">
        <div className="flex flex-grow items-center lg:basis-1/2">
          <ProductImages urlData={productData?.imageUrls ?? []} />
        </div>
        <div className="flex flex-grow items-center lg:basis-1/2">
          <div className="flex flex-col gap-4 lg:px-6">
            <div className="flex items-center justify-between gap-4">
              <Heading3>{productData?.name}</Heading3>
              <Button size={'icon'} className="p-4">
                <Heart strokeWidth={1} />
              </Button>
            </div>
            <div>
              <Heading5 className="mb-1">About Product:</Heading5>
              <p className="text-pretty font-normal text-secondary-foreground">
                {productData?.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {productData?.tags.map((tag, idx) => (
                <Badge variant={'secondary'} key={idx}>
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2 text-lg font-medium text-secondary-foreground">
              <span>Category:</span>
              <Badge className="w-fit">{productData?.category}</Badge>
            </div>
            <div className="flex gap-2 text-lg font-medium text-secondary-foreground">
              <span>Brand:</span>
              <span className="text-primary">{productData?.brand}</span>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-lg font-medium text-secondary-foreground">
                Price:
                <span className="text-primary"> $ {productData?.price}</span>
              </p>
              <p className="text-lg font-medium text-secondary-foreground">
                Available Stock:
                <span className="text-primary">
                  {productData?.stockQuantity}
                </span>
              </p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center border">
                <Button
                  size={'icon'}
                  variant={'outline'}
                  className="border border-none"
                >
                  <Minus className="size-5" />
                </Button>
                <div className="flex h-full flex-grow items-center justify-center border-l border-r px-6">
                  1
                </div>
                <Button
                  size={'icon'}
                  variant={'outline'}
                  className="border-none"
                >
                  <Plus className="size-5" />
                </Button>
              </div>
              <Button size={'lg'} variant={'secondary'} className="flex-grow">
                <ShoppingCart className="size-5" /> Add to Cart
              </Button>
            </div>
            <div>
              <Button className="w-full" size={'lg'}>
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
