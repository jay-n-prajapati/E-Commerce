import Navbar from '@/components/custom/Navbar';
import { ReactNode } from 'react';

const CustomerLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto h-screen pt-20">{children}</div>
    </div>
  );
};

export default CustomerLayout;
