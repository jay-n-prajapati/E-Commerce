import Navbar from '@/components/custom/Navbar';
import { ReactNode } from 'react';

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto size-full">{children}</div>;
    </div>
  );
};

export default AppLayout;
