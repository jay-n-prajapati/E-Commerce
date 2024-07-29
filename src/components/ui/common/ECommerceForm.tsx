import React from 'react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../form';
import { Input } from '../input';
import { Button } from '../button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../select';
import { cn } from '@/lib/utils';

type syncWithObj<T> = {
  syncWithKey: keyof T;
  transformFunction?: (value: string) => string;
};

export type ECommerceFormElement<T> = {
  type: 'input' | 'element' | 'date' | 'color' | 'select' | 'file';
  // key: keyof T;
  key: string;
  syncKey?: keyof T | undefined;
  syncWith?: syncWithObj<T>[] | undefined;
  selectItems?: string[] | [];
  placeholder?: string;
  label: string;
  description?: string;
  // label: keyof typeof enLocalKeys;
  // placeholder?: keyof typeof enLocalKeys;
};

export function ECommerceForm<T>({
  className,
  formSchema,
  initialValues,
  onSubmit,
  elements,
}: {
  className?: string;
  formSchema?: any;
  initialValues?: T;
  onSubmit?: (e: any) => void;
  elements: ECommerceFormElement<T>[];
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('space-y-4', className)}
      >
        {elements.map((ele, idx) => {
          if (ele.type === 'select') {
            return (
              <FormField
                key={idx}
                control={form.control}
                name={ele.key}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{ele.label}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={ele.placeholder} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ele.selectItems?.map((item, idx) => (
                          <SelectItem key={idx} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>{ele.description}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          }

          return (
            <FormField
              key={idx}
              control={form.control}
              name={ele.key}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{ele.label}</FormLabel>
                  <FormControl>
                    <Input placeholder={ele.placeholder} {...field} />
                  </FormControl>
                  <FormDescription>{ele.description}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
