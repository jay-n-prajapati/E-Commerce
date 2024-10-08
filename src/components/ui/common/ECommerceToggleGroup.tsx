'use client';

import { cn } from '@/lib/utils';
import { ToggleGroup, ToggleGroupItem } from '../toggle-group';

interface ECommerceToggleGroupProps {
  type: 'single' | 'multiple';
  toggleItems: { label: string; value: string }[];
  onChange: (_value: string | string[]) => void;
  containerClassName?: string;
  itemsClassName?: string;
  value: string[];
}

export default function ECommerceToggleGroup({
  toggleItems = [],
  onChange,
  value = [],
  itemsClassName,
  containerClassName,
}: ECommerceToggleGroupProps) {
  return (
    <ToggleGroup
      type={'multiple'}
      value={value}
      onValueChange={(value) => onChange(value)}
      className={containerClassName}
    >
      {toggleItems.map((item, idx) => (
        <ToggleGroupItem
          key={idx}
          value={item.value}
          className={cn('', itemsClassName)}
          variant={'outline'}
        >
          {item.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
