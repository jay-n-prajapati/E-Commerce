import { cn } from '@/lib/utils';
import React from 'react';

interface IProps {
  children: React.ReactNode;
  className?: string;
}

const Heading3 = ({ children, className }: IProps) => {
  return (
    <h1
      className={cn(
        'text-2xl font-semibold tracking-tight text-primary lg:text-3xl',
        className
      )}
    >
      {children}
    </h1>
  );
};

export default Heading3;
