import ECommerceFilterSidebar from '@/components/ui/common/ECommerceFilterSidebar';
import { ECommerceThemeSwitch } from '@/components/ui/common/ECommerceThemeSwitch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ShoppingCartIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function FilterSidebar() {
  return (
    <div className="sticky left-0 top-0 hidden h-full basis-1/3 bg-primary-foreground shadow-lg lg:block">
      <ScrollArea className="h-full">
        <div className="flex items-center justify-between gap-2 border-b px-4 py-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <ShoppingCartIcon className="size-7" />
            <p className="hidden text-lg sm:block">E-Commerce</p>
          </Link>
          <ECommerceThemeSwitch />
        </div>
        <ECommerceFilterSidebar />
      </ScrollArea>
    </div>
  );
}
