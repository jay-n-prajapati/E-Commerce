import { cn } from '@/lib/utils';
import React from 'react';

const ECommerceContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn('py-20', className)}>{children}</div>;
};

export default ECommerceContainer;
