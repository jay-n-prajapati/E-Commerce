import DashBoard from './components/DashBoard';
import React from 'react';
import ECommerceDashboardPageHeader from '@/components/ui/common/ECommerceDashboardPageHeader';

export default function Component() {
  return (
    <div className="flex min-h-full flex-col gap-6 p-6">
      <ECommerceDashboardPageHeader
        title="Dashboard"
        descriptions="Manage your Tags and Categories here"
      />{' '}
      <div className="h-full">
        <DashBoard />
      </div>
    </div>
  );
}
