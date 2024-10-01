import React from 'react';
import ECommerceBreadCrumbs from './ECommerceBreadCrumbs';
import Heading2 from '../headings/Heading2';

interface ECommerceDashboardPageHeaderProps {
  title: string;
  descriptions: string;
}

export default function ECommerceDashboardPageHeader({
  title,
  descriptions,
}: ECommerceDashboardPageHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <ECommerceBreadCrumbs />
      <div>
        <Heading2 className="mb-1 font-bold">{title}</Heading2>
        <p className="font-medium">{descriptions}</p>
      </div>
    </div>
  );
}
