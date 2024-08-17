import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ECommerceContainer from '@/components/ui/common/ECommerceContainer';
import Heading2 from '@/components/ui/headings/Heading2';
import Heading4 from '@/components/ui/headings/Heading4';
import { StarIcon } from 'lucide-react';
import Image from 'next/image';

const product = {
  id: 1,
  title: 'Essence Mascara Lash Princess',
  description:
    'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.',
  category: 'beauty',
  price: 9.99,
  rating: 4.94,
  stock: 5,
  tags: ['beauty', 'mascara'],
  brand: 'Essence',
  images: [
    'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png',
  ],
  thumbnail:
    'https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20AirPods%20Max%20Silver/thumbnail.png',
};

const ProductDetail = ({ params }) => {
  return (
    <ECommerceContainer>
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="relative h-auto basis-full rounded-xl border lg:basis-1/2">
          <Image src={product.thumbnail} alt="img" fill />
        </div>
        <div className="flex basis-full flex-col justify-center gap-6 lg:basis-1/2">
          <div className="flex flex-col gap-2">
            <Heading2 className="text-primary">{product.title}</Heading2>
            <p className="font-medium">Brand : {product.brand}</p>
            <Heading4 className="text-muted-foreground">
              {product.description}
            </Heading4>
          </div>
          <Heading4 className="capitalize">
            Category : {product.category}
          </Heading4>
          <div className="flex items-center gap-4">
            <div className="flex gap-1">
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
            </div>
            <div>
              <Heading4>({product.rating})</Heading4>
            </div>
          </div>
          <Heading4 className="font-bold">Price : ${product.price}</Heading4>
          <div className="flex flex-wrap gap-3">
            {product.tags.map((tag, idx) => (
              <Badge
                key={idx}
                variant={'secondary'}
                className="text-lg capitalize"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex gap-8">
            <Button size={'lg'}>Add to Cart</Button>
            <Button variant={'outline'} size={'lg'}>
              Add to favorite
            </Button>
          </div>
        </div>
      </div>
    </ECommerceContainer>
  );
};

export default ProductDetail;
