'use client';

import React, { useState } from 'react';
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
import CategoryModal from '@/components/custom/CategoryModal/CategoryModal';
import useProduct from '../hooks/useProduct';

const productFormSchema = z.object({
  name: z.string().min(3, '* Minimum 3 characters required'),
  description: z
    .string()
    .min(10, '* Minimum 10 characters required')
    .max(30, 'Maximum word limit is 30'),
  category: z.string({ message: '* Category is required' }),
  stock: z.number(),
  price: z.number(),
});

const AddProduct = () => {
  const { categoriesData } = useProduct();

  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {},
    mode: 'onBlur',
  });

  const onSubmit = () => {};

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-6 py-4 lg:grid-cols-2">
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
                          <Select>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={'Select Category'} />
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
                          <CategoryModal>
                            <Button type="button" size={'sm'}>
                              <CirclePlus className="size-4" />
                              Add Category
                            </Button>
                          </CategoryModal>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6">
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
                      name="stock"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stock</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Product Stock"
                              {...field}
                              type="number"
                            />
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
                            <Input
                              placeholder="Product Price"
                              {...field}
                              type="number"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 rounded-lg border bg-primary-foreground p-8">
                <div>
                  <Heading4>Product Images</Heading4>
                  <p className="text-secondary-foreground">
                    Lorem ipsum, dolor sit amet consectetur adipisicing.
                  </p>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default AddProduct;
