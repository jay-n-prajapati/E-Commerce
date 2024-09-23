'use client';

import Link from 'next/link';
import ECommerceTooltip from './ECommerceTooltip';
import { NavLinks } from '@/constants/links';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '../button';
import { Package } from 'lucide-react';
import ECommerceAvatar from './ECommerceAvatar';
import { ECommerceThemeSwitch } from './ECommerceThemeSwitch';

const ECommerceSidebar = () => {
  const pathName = usePathname();
  return (
    <aside className="flex h-screen flex-col gap-6 border-r bg-primary-foreground">
      <div className="border-b p-2">
        <Button size={'icon'} className="size-14 rounded-full">
          <Package />
        </Button>
      </div>
      <nav className="flex flex-grow flex-col gap-4 px-4">
        {NavLinks['admin']?.map((link, idx) => (
          <ECommerceTooltip tooltipContent={link.label} key={idx}>
            <Link
              href={link.slug}
              className={cn(
                'rounded p-2 duration-300',
                pathName === link.slug
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-secondary hover:text-primary'
              )}
            >
              {link.icon}
            </Link>
          </ECommerceTooltip>
        ))}
      </nav>
      <div className="flex flex-col items-center gap-4 p-4">
        <ECommerceAvatar src="" username="Admin" />
        <ECommerceThemeSwitch />
      </div>
    </aside>
  );
};

export default ECommerceSidebar;
