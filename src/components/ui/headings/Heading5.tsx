import { cn } from '@/lib/utils';
import React from 'react';

interface IProps {
  children: React.ReactNode;
  className?: string;
}

const Heading5 = ({ children, className }: IProps) => {
  return (
    <h1
      className={cn(
        'text-lg font-semibold tracking-tight text-primary lg:text-xl',
        className
      )}
    >
      {children}
    </h1>
  );
};

export default Heading5;
