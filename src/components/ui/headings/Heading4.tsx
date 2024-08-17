import { cn } from '@/lib/utils';
import React from 'react';

interface IProps {
  children: React.ReactNode;
  className?: string;
}

const Heading4 = ({ children, className }: IProps) => {
  return (
    <h1
      className={cn(
        'text-xl font-semibold tracking-tight text-primary lg:text-2xl',
        className
      )}
    >
      {children}
    </h1>
  );
};

export default Heading4;
