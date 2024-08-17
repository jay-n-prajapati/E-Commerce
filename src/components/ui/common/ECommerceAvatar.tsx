import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../avatar';
import { cn } from '@/lib/utils';

const ECommerceAvatar = ({
  src,
  username,
  className,
}: {
  src: string;
  username: string;
  className?: string;
}) => {
  const fallBackName = username.charAt(0).toUpperCase();
  return (
    <Avatar className={cn('', className)}>
      <AvatarImage src={src} />
      <AvatarFallback>{fallBackName}</AvatarFallback>
    </Avatar>
  );
};

export default ECommerceAvatar;
