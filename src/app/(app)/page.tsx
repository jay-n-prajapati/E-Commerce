'use client';

import { z } from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  lastName: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  message: z
    .string()
    .min(10, {
      message: 'Message must be at least 10 characters.',
    })
    .max(50, { message: "'Message must be at most 50 characters.'" }),
  suburb: z.string({
    required_error: 'Please select an email to display.',
  }),
});

const prods = [
  {
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
      'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png',
  },
  {
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
      'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png',
  },
  {
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
      'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png',
  },
  {
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
      'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png',
  },
  {
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
      'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png',
  },
  {
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
      'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png',
  },
  {
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
      'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png',
  },
  {
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
      'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png',
  },
  {
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
      'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png',
  },
  {
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
      'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png',
  },
];

export default function Home() {
  const session = useSession();
  return (
    <>
      <div className="bg-red-300">{JSON.stringify(session)}</div>
      <div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {prods.map((prod, idx) => (
            <Card key={idx} className="shadow-md duration-300 hover:shadow-xl">
              <CardHeader>
                <div className="relative h-40">
                  <Image src={prod.thumbnail} alt={prod.title} fill />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle>{prod.title}</CardTitle>
                <CardDescription>{prod.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <div>
                  <Button>Add to Cart</Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
