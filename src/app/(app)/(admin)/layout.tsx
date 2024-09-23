import ECommerceSidebar from '@/components/ui/common/ECommerceSidebar';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex size-full">
        <div className="sticky left-0 top-0">
          <ECommerceSidebar />
        </div>
        <div className="size-full overflow-y-auto bg-secondary p-6">
          <div className="container size-full">{children}</div>
        </div>
      </div>
    </>
  );
};

export default layout;
