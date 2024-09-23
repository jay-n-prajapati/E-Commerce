import Heading2 from '@/components/ui/headings/Heading2';
import DashBoard from './components/DashBoard';
import React from 'react';

export default function Component() {
  return (
    <div className="flex min-h-full flex-col gap-8 rounded-t-lg border bg-primary-foreground p-6">
      <Heading2>Dashboard</Heading2>
      <div className="h-full">
        <DashBoard />
      </div>
    </div>
  );
}
