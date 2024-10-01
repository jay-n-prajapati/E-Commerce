'use client';

import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from '@/components/ui/extension/multi-select';
import { ISelectItems } from '@/constants/interfaces';

interface IProps {
  placeholder?: string;
  value: string[];
  onChange: (_value: string[]) => void;
  selectItems: ISelectItems[];
}

const ECommerceMultiSelect = ({
  value,
  onChange,
  placeholder,
  selectItems,
}: IProps) => {
  return (
    <MultiSelector values={value} onValuesChange={onChange}>
      <MultiSelectorTrigger>
        <MultiSelectorInput placeholder={placeholder ?? 'Select items'} />
      </MultiSelectorTrigger>
      <MultiSelectorContent>
        <MultiSelectorList>
          {selectItems.map((item, idx) => (
            <MultiSelectorItem value={item.value} key={idx}>
              {item.label}
            </MultiSelectorItem>
          ))}
        </MultiSelectorList>
      </MultiSelectorContent>
    </MultiSelector>
  );
};

export default ECommerceMultiSelect;
