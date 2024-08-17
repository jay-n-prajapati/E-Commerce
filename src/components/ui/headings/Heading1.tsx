import { cn } from '@/lib/utils';
import React from 'react';

interface IProps {
  children: React.ReactNode;
  className?: string;
}

const Heading1 = ({ children, className }: IProps) => {
  return (
    <h1
      className={cn(
        'text-4xl font-extrabold tracking-tight text-primary lg:text-5xl',
        className
      )}
    >
      {children}
    </h1>
  );
};

export default Heading1;
