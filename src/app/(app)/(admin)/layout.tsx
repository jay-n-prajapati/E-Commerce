import { ThemeSwitch } from '@/components/custom/ThemeSwitch';
import ECommerceAvatar from '@/components/ui/common/ECommerceAvatar';
import ECommerceSidebar from '@/components/ui/common/ECommerceSidebar';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="size-full overflow-y-auto bg-secondary">
      <div className="fixed left-0 top-0 z-50">
        <ECommerceSidebar />
      </div>
      <div className="container flex size-full flex-col gap-2 p-6 pl-20">
        <div className="flex justify-end gap-2">
          <ECommerceAvatar src="" username="Admin" />
          <ThemeSwitch />
        </div>
        <div className="size-full">{children}</div>
      </div>
    </div>
  );
};

export default layout;
