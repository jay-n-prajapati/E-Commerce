import Loading from '@/app/loading';
import ECommerceSidebar from '@/components/ui/common/ECommerceSidebar';
import React, { Suspense } from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex size-full">
        <div className="sticky left-0 top-0">
          <ECommerceSidebar />
        </div>
        <div className="size-full overflow-y-auto bg-secondary p-6">
          <Suspense fallback={<Loading />}>
            <div className="container h-full min-h-full bg-primary-foreground">
              {children}
            </div>
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default layout;
