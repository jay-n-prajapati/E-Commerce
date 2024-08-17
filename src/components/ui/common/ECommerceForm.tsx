import React, { useState } from 'react';
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
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Textarea } from '../textarea';
import { ISelectItems } from '@/constants/interfaces';

type syncWithObj<T> = {
  syncWithKey: keyof T;
  transformFunction?: (value: string) => string;
};

export type ECommerceFormElement<T> = {
  type:
    | 'input'
    | 'password'
    | 'textarea'
    | 'element'
    | 'date'
    | 'color'
    | 'select'
    | 'file';
  key: keyof T;
  syncKey?: keyof T | undefined;
  syncWith?: syncWithObj<T>[] | undefined;
  selectItems?: ISelectItems[] | [];
  placeholder?: string;
  label: string;
  description?: string;
};

export function ECommerceForm<T>({
  className,
  formSchema,
  initialValues,
  onSubmit,
  elements,
  children,
}: {
  className?: string;
  formSchema: any;
  initialValues: T;
  onSubmit: (data: T) => void;
  elements: ECommerceFormElement<T>[];
  children: React.ReactNode;
}) {
  const [showPass, setShowPass] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
    mode: 'onChange',
  });

  const onFieldChange = (
    value: string,
    key: keyof T,
    syncKey?: keyof T,
    syncWith?: syncWithObj<T>[]
  ) => {
    form.setValue(key as string, value);
    if (key === syncKey && syncWith) {
      syncWith.forEach((syncWithObj) => {
        const { syncWithKey, transformFunction } = syncWithObj;
        const newVal = transformFunction ? transformFunction(value) : value;
        form.setValue(syncWithKey as string, newVal);
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('space-y-4 transition-all duration-300', className)}
      >
        {elements.map((ele, idx) => {
          if (ele.type === 'select') {
            return (
              <FormField
                key={idx}
                control={form.control}
                name={ele.key as string}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{ele.label}</FormLabel>
                    <Select
                      name={ele.key as string}
                      defaultValue={field.value}
                      onValueChange={(value) => {
                        onFieldChange(
                          value,
                          ele.key as keyof T,
                          ele.syncKey,
                          ele.syncWith
                        );
                      }}
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
          if (ele.type === 'textarea') {
            return (
              <FormField
                key={idx}
                control={form.control}
                name={ele.key as string}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{ele.label}</FormLabel>
                    <FormControl>
                      <Textarea
                        key={idx}
                        placeholder={ele.placeholder}
                        className="resize-none"
                        {...field}
                        onChange={(e) => {
                          onFieldChange(
                            e.target.value,
                            ele.key as keyof T,
                            ele.syncKey,
                            ele.syncWith
                          );
                        }}
                      />
                    </FormControl>
                    <FormDescription>{ele.description}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          }
          if (ele.type === 'password') {
            return (
              <FormField
                key={idx}
                control={form.control}
                name={ele.key as string}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{ele.label}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPass ? 'text' : 'password'}
                          placeholder="Enter your password"
                          {...field}
                          onChange={(e) => {
                            onFieldChange(
                              e.target.value,
                              ele.key as keyof T,
                              ele.syncKey,
                              ele.syncWith
                            );
                          }}
                        />
                        <div
                          className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer p-4"
                          onClick={() => setShowPass(!showPass)}
                        >
                          {showPass ? (
                            <EyeOffIcon className="h-5 w-5" />
                          ) : (
                            <EyeIcon className="h-5 w-5" />
                          )}
                        </div>
                      </div>
                    </FormControl>
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
              name={ele.key as string}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{ele.label}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={ele.placeholder}
                      {...field}
                      onChange={(e) => {
                        onFieldChange(
                          e.target.value,
                          ele.key as keyof T,
                          ele.syncKey,
                          ele.syncWith
                        );
                      }}
                    />
                  </FormControl>
                  <FormDescription>{ele.description}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}
        {children}
      </form>
    </Form>
  );
}
