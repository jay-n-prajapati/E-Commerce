import React from 'react';
import { RadioGroup, RadioGroupItem } from '../radio-group';
import { Label } from '../label';
import { cn } from '@/lib/utils';

interface ECommerceRadioGroupProps {
  radioItems: { label: string; value: string }[];
  onChange: (_value: string) => void;
  itemWrapperClassName?: string;
  value: string;
}

export default function ECommerceRadioGroup({
  radioItems = [],
  onChange,
  itemWrapperClassName,
  value = '',
}: ECommerceRadioGroupProps) {
  return (
    <RadioGroup value={value} onValueChange={(value) => onChange(value)}>
      {radioItems.map((item, idx) => (
        <div
          className={cn('flex items-center space-x-2', itemWrapperClassName)}
          key={idx}
        >
          <RadioGroupItem value={item.value} id={`option-${idx + 1}`} />
          <Label htmlFor={`option-${idx + 1}`} className="capitalize">
            {item.label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
