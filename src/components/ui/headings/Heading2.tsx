import { cn } from '@/lib/utils';
import React from 'react';

interface IProps {
  children: React.ReactNode;
  className?: string;
}

const Heading2 = ({ children, className }: IProps) => {
  return (
    <h1
      className={cn(
        'text-3xl font-bold tracking-tight text-primary lg:text-4xl',
        className
      )}
    >
      {children}
    </h1>
  );
};

export default Heading2;
