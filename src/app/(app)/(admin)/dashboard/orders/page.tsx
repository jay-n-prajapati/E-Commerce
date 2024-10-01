import ECommerceDashboardPageHeader from '@/components/ui/common/ECommerceDashboardPageHeader';
import React from 'react';

const Orders = () => {
  return (
    <div className="flex h-full flex-col gap-6 p-6">
      <ECommerceDashboardPageHeader
        title="Orders"
        descriptions="Manage your Orders here"
      />
    </div>
  );
};

export default Orders;
