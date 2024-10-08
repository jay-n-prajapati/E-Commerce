'use client';

import { ISelectItems } from '@/constants/interfaces';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../select';

interface IProps {
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
}: IProps) {
  return (
    <Select value={value} onValueChange={(value) => onChange(value)}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={value ? value : placeholder} />
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
