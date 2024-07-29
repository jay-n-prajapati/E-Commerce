import { ReactNode } from 'react';

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      
      <div className="container mx-auto size-full">{children}</div>
    </div>
  );
};

export default AppLayout;
