'use client';

import { Button } from '@/components/ui/button';
import Heading2 from '@/components/ui/headings/Heading2';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const NotFound = () => {
  const router = useRouter();
  return (
    <div className="flex h-screen w-full items-center justify-center p-4">
      <div className="flex flex-col gap-8">
        <Image
          src={'/images/404.svg'}
          alt="404-error"
          width={600}
          height={600}
          priority
        />
        <Heading2 className="mx-auto text-primary">Page Not Found</Heading2>
        <Button
          className="mx-auto w-auto"
          size={'lg'}
          onClick={() => router.back()}
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
