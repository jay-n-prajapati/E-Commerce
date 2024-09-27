'use client';

import React from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Heading4 from '@/components/ui/headings/Heading4';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { CirclePlus } from 'lucide-react';
import ECommerceImageUpload from '@/components/ui/common/ECommerceImageUpload';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import useProducts from '../hooks/useProducts';
import { IProduct } from '@/models/product.model';

const productFormSchema = z.object({
  name: z.string().min(3, '* Minimum 3 characters required'),
  description: z
    .string()
    .min(10, '* Minimum 10 characters required')
    .max(30, 'Maximum word limit is 30'),
  category: z.string({ message: '* Category is required' }),
  stockQuantity: z.string(),
  price: z.string(),
  thumbnailUrl: z.string(),
  imageUrls: z.array(z.string()).length(4, '* min. 4 images required'),
});

interface IProps {
  initialValues: IProduct;
}

export default function ProductForm({ initialValues }: IProps) {
  const { categoriesData, upsertProductLoading, saveProduct } = useProducts();
  const router = useRouter();

  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: initialValues,
    mode: 'onBlur',
  });

  const onSubmit = async (data: z.infer<typeof productFormSchema>) => {
    const res = await saveProduct({
      ...data,
      price: +data.price,
      stockQuantity: +data.stockQuantity,
      id: initialValues.id,
    });
    if (res) {
      router.push('/products');
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-grow">
          <div className="grid h-full gap-6 lg:grid-cols-2">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4 rounded-lg border bg-primary-foreground p-8">
                <div>
                  <Heading4 className="font-bold">Product Details</Heading4>
                  <p className="text-secondary-foreground">
                    Lorem ipsum, dolor sit amet consectetur adipisicing.
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Product Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Product Description"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4 rounded-lg border bg-primary-foreground p-8">
                <div>
                  <Heading4 className="font-bold">Product Category</Heading4>
                  <p className="text-secondary-foreground">
                    Lorem ipsum, dolor sit amet consectetur adipisicing.
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Category</FormLabel>
                        <div className="flex items-center gap-4">
                          <Select
                            onValueChange={(value) =>
                              form.setValue('category', value)
                            }
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue
                                  placeholder={
                                    field.value
                                      ? field.value
                                      : 'Select Category'
                                  }
                                  defaultValue={field.value}
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categoriesData?.map((item, idx) => (
                                <SelectItem
                                  key={idx}
                                  value={String(item.value)}
                                  className="capitalize"
                                >
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Link href={'/addCategory'}>
                            <Button type="button">
                              <CirclePlus className="size-4" />
                              Add Category
                            </Button>
                          </Link>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4 rounded-lg border bg-primary-foreground p-8">
                <div>
                  <Heading4>Stock and Price</Heading4>
                  <p className="text-secondary-foreground">
                    Lorem ipsum, dolor sit amet consectetur adipisicing.
                  </p>
                </div>
                <div className="flex flex-col gap-6 sm:flex-row">
                  <div className="sm:basis-1/2">
                    <FormField
                      control={form.control}
                      name="stockQuantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stock</FormLabel>
                          <FormControl>
                            <Input placeholder="Product Stock" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="sm:basis-1/2">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price</FormLabel>
                          <FormControl>
                            <Input placeholder="Product Price" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4 rounded-lg border bg-primary-foreground p-8">
                <div>
                  <Heading4>Product Images</Heading4>
                  <p className="text-secondary-foreground">
                    Lorem ipsum, dolor sit amet consectetur adipisicing.
                  </p>
                </div>
                <div>
                  <ECommerceImageUpload
                    onChange={(e) => {
                      form.setValue('imageUrls', e);
                      form.setValue('thumbnailUrl', e[0]);
                    }}
                    initialImages={form.getValues('imageUrls')}
                  />
                  <FormMessage className="mt-2">
                    {form.formState.errors.imageUrls &&
                      '* min. 4 images required'}
                  </FormMessage>
                </div>
              </div>
              <div className="flex gap-6">
                <Button
                  size={'lg'}
                  type="submit"
                  isLoading={upsertProductLoading}
                  disabled={upsertProductLoading}
                >
                  Save Product
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}
