import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return <div className='h-screen w-full'>{children}</div>;
};

export default layout;
