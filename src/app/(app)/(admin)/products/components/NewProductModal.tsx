'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
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

const productFormSchema = z.object({
  name: z.string().min(3, '* Minimum 3 characters required'),
  description: z
    .string()
    .min(10, '* Minimum 10 characters required')
    .max(30, 'Maximum word limit is 30'),
});

const selectItems = ['mobile', 'laptop', 'home appliances', 'sport'];

const NewProductModal = ({ children }: { children: React.ReactNode }) => {
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
          <div className="grid gap-6 py-4 sm:grid-cols-2">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4 rounded-lg bg-secondary p-6">
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
              <div className="flex flex-col gap-4 rounded-lg bg-secondary p-6">
                <div>
                  <Heading4 className="font-bold">Product Category</Heading4>
                  <p className="text-secondary-foreground">
                    Lorem ipsum, dolor sit amet consectetur adipisicing.
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Description</FormLabel>
                        <div className="flex items-center gap-4">
                          <Select>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={'Select Category'} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {selectItems?.map((item, idx) => (
                                <SelectItem
                                  key={idx}
                                  value={item}
                                  className="capitalize"
                                >
                                  {item}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Button type="button" size={'sm'}>
                            Add Category
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="bg-secondary p-6">
              <Heading4>Product Images</Heading4>
              <p className="text-secondary-foreground">
                Lorem ipsum, dolor sit amet consectetur adipisicing.
              </p>
              <div></div>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default NewProductModal;
