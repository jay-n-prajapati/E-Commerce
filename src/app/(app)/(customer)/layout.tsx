import Loading from '@/app/loading';
import Navbar from '@/components/custom/Navbar';
import { ReactNode, Suspense } from 'react';

const CustomerLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      <Suspense fallback={<Loading />}>
        <div className="container mx-auto h-screen px-4 pt-24">{children}</div>
      </Suspense>
    </div>
  );
};

export default CustomerLayout;
