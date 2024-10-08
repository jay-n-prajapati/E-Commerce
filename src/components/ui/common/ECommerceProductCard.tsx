import React from 'react';
import { Card } from '../card';
import Image from 'next/image';
import { Button } from '../button';
import { Heart, ShoppingCartIcon } from 'lucide-react';
import { IProduct } from '@/models/product.model';
import { Badge } from '../badge';

import Link from 'next/link';

interface ECommerceProductCardProps {
  product: IProduct;
}

export default function ECommerceProductCard({
  product,
}: ECommerceProductCardProps) {
  return (
    <Card className="flex max-h-fit flex-col gap-2 p-4 hover:shadow-md">
      <div className="group relative h-60 overflow-hidden rounded-lg border p-2 transition-all duration-500">
        <Image
          src={product.thumbnailUrl}
          alt={product.name}
          fill
          className="object-contain transition-all duration-300 hover:scale-110"
        />
      </div>
      <div className="flex flex-grow flex-col justify-between gap-4">
        <Link href={`/product/${product.id}`}>
          <p className="text-lg font-semibold text-primary">{product.name}</p>
        </Link>
        <div className="flex justify-between">
          <div>
            Price : <span>$ {product.price}</span>
          </div>
          <div>
            <Badge>{product.category}</Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant={'outline'} size={'icon'}>
            <Heart />
          </Button>
          <Button className="w-full gap-2 transition-all duration-300">
            <ShoppingCartIcon />
            <span>Add to Cart</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
