import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../tooltip';

const ECommerceTooltip = ({
  children,
  tooltipContent = 'tooltip',
}: {
  children: React.ReactNode;
  tooltipContent?: string;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side="right" className="rounded-lg">
          <p className="capitalize">{tooltipContent}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ECommerceTooltip;
