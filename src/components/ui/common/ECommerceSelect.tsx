'use client';

import { ISelectItems } from '@/constants/interfaces';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../select';

interface ECommerceSelectProps {
  value: string;
  placeholder: string;
  selectItems: ISelectItems[];
  onChange: (_selectedVal: string) => void;
  className?: string;
}

export default function ECommerceSelect({
  value,
  placeholder,
  selectItems = [],
  className,
  onChange,
}: ECommerceSelectProps) {
  return (
    <Select value={value} onValueChange={(value) => onChange(value)}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {selectItems.map((item) => (
          <SelectItem
            value={item.value}
            key={item.value}
            className="capitalize"
          >
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
