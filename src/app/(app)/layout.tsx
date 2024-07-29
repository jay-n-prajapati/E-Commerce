import { ReactNode } from 'react';

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      
      <div className="container mx-auto size-full bg-slate-500">{children}</div>
    </div>
  );
};

export default AppLayout;
