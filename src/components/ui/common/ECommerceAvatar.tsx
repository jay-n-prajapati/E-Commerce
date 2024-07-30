import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../avatar';

const ECommerceAvatar = ({
  src,
  username,
}: {
  src: string;
  username: string;
}) => {
    const fallBackName = username.charAt(0).toUpperCase()
  return (
    <Avatar>
      <AvatarImage src={src} />
      <AvatarFallback>{fallBackName}</AvatarFallback>
    </Avatar>
  );
};

export default ECommerceAvatar;
