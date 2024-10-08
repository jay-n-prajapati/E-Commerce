'use client';

import ECommerceAccordion from '@/components/ui/common/ECommerceAccordian';
import ECommerceRadioGroup from '@/components/ui/common/ECommerceRadioGroup';
import ECommerceToggleGroup from '@/components/ui/common/ECommerceToggleGroup';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import useAppData from '@/hooks/useAppData';
import useProductsList from '@/hooks/useProductsList';
import React, { useState } from 'react';

export default function ECommerceFilterSidebar() {
  const { categories, tags } = useAppData();
  const {
    filters: { category, tags: tagGroup },
    updateFilters,
    productsData: { maxPrice: defaultMaxPrice },
  } = useProductsList();

  const [sliderVal, setSliderVal] = useState({
    min: 0,
    max: defaultMaxPrice,
  });

  return (
    <div className="size-full px-4">
      <ECommerceAccordion
        type="multiple"
        defaultValue={['item-1', 'item-3']}
        accordionItems={[
          {
            triggerText: 'Price',
            content: (
              <div className="flex flex-col gap-4">
                <Slider
                  defaultValue={[0, defaultMaxPrice]}
                  value={[sliderVal.min, sliderVal.max ?? 10000]}
                  onValueChange={(values) =>
                    setSliderVal({ min: values[0], max: values[1] })
                  }
                  min={0}
                  max={defaultMaxPrice}
                  minStepsBetweenThumbs={1}
                  step={1}
                  onValueCommit={(values) => {
                    updateFilters('minPrice', String(values[0]));
                    updateFilters('maxPrice', String(values[1]));
                  }}
                />
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="$min"
                    value={sliderVal.min}
                    onChange={(e) => {
                      setSliderVal((prev) => ({
                        ...prev,
                        min: Number(e.target.value),
                      }));
                      updateFilters('minPrice', e.target.value);
                    }}
                  />
                  <p>to</p>
                  <Input
                    placeholder="$max"
                    value={sliderVal.max}
                    onChange={(e) => {
                      setSliderVal((prev) => ({
                        ...prev,
                        max: Number(e.target.value),
                      }));
                      updateFilters('maxPrice', e.target.value);
                    }}
                  />
                </div>
              </div>
            ),
          },
          {
            triggerText: 'Category',
            content: (
              <>
                <ECommerceRadioGroup
                  value={category!}
                  onChange={(value) => updateFilters('category', value)}
                  radioItems={
                    categories && [
                      { label: 'All', value: '' },
                      ...categories.map((category) => ({
                        label: category.name,
                        value: category.slug,
                      })),
                    ]
                  }
                />
              </>
            ),
          },
          {
            triggerText: 'Tags',
            content: (
              <>
                <p className="mb-4 text-primary">
                  Select or toggle tags to apply filter
                </p>
                <ECommerceToggleGroup
                  value={tagGroup!}
                  onChange={(value) => updateFilters('tags', value as string[])}
                  toggleItems={
                    tags &&
                    tags.map((tag) => ({
                      label: tag.name,
                      value: tag.name,
                    }))
                  }
                  type="multiple"
                  itemsClassName="text-left capitalize"
                  containerClassName="flex-wrap gap-2 item-normal justify-normal"
                />
              </>
            ),
          },
        ]}
      />
    </div>
  );
}
