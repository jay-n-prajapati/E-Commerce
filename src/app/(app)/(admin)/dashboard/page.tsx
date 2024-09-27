import Heading2 from '@/components/ui/headings/Heading2';
import DashBoard from './components/DashBoard';
import React from 'react';

export default function Component() {
  return (
    <div className="flex size-full flex-col gap-6 p-6">
      <Heading2>Dashboard</Heading2>
      <div className="h-full">
        <DashBoard />
      </div>
    </div>
  );
}
