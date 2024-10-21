import Loading from '@/app/loading';
import ECommerceSidebar from '@/components/ui/common/ECommerceSidebar';
import React, { Suspense } from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full w-full bg-secondary">
      <div className="sticky left-0 top-0 h-full">
        <ECommerceSidebar />
      </div>
      <div className="flex-grow overflow-y-auto p-4">
        <div className="container flex min-h-full flex-col gap-4 bg-primary-foreground p-6">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </div>
      </div>
    </div>
  );
};

export default Layout;
