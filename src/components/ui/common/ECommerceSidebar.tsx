import Link from 'next/link';
import ECommerceTooltip from './ECommerceTooltip';
import { NavLinks } from '@/constants/links';
import Heading4 from '../headings/Heading4';
import { Package } from 'lucide-react';

const ECommerceSidebar = () => {
  return (
    <aside className="h-screen bg-primary-foreground">
      <div className="flex items-center justify-center py-6">
        <Heading4 className="rounded-full bg-primary p-2 text-lg text-primary-foreground">
          <Package />
        </Heading4>
      </div>
      <nav className="flex w-16 flex-col items-center justify-center gap-4 py-4">
        {NavLinks['admin']?.map((link, idx) => (
          <ECommerceTooltip tooltipContent={link.label} key={idx}>
            <Link
              href={link.slug}
              className="rounded p-2 duration-300 hover:bg-secondary hover:text-primary"
            >
              {link.icon}
            </Link>
          </ECommerceTooltip>
        ))}
      </nav>
    </aside>
  );
};

export default ECommerceSidebar;
