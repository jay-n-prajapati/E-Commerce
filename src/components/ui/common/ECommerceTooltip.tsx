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
  side = 'top',
  align = 'center',
}: {
  children: React.ReactNode;
  tooltipContent?: string;
  side?: 'left' | 'right' | 'top' | 'bottom';
  align?: 'center' | 'end' | 'start';
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          className="rounded-lg capitalize"
          side={side}
          align={align}
        >
          {tooltipContent}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ECommerceTooltip;
