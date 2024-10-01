'use client';

import Image from 'next/image';
import { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';

interface IProps {
  urlData: string[];
}

export default function ProductImages({ urlData }: IProps) {
  const [api, setApi] = useState<CarouselApi>();

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-2 lg:w-full lg:max-w-full lg:flex-row-reverse">
      <div className="flex-grow overflow-hidden rounded-lg lg:w-full">
        <Carousel setApi={setApi}>
          <CarouselContent>
            {urlData.map((url) => (
              <CarouselItem key={url} className="relative aspect-square">
                <Image
                  src={url}
                  alt="Product Image"
                  fill
                  className="object-contain"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div className="grid min-h-20 basis-1/5 grid-cols-4 gap-2 lg:grid-cols-1 lg:grid-rows-4">
        {urlData.map((url, index) => (
          <div
            key={index}
            className={`relative aspect-square cursor-pointer border border-primary lg:aspect-auto`}
            onClick={() => api?.scrollTo(index)}
          >
            <Image
              src={url}
              alt="Product Image"
              fill
              className="rounded-lg object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
