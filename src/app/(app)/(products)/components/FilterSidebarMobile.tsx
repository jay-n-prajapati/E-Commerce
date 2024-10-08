import { Button } from '@/components/ui/button';
import ECommerceFilterSidebar from '@/components/ui/common/ECommerceFilterSidebar';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Filter } from 'lucide-react';
import React from 'react';

export default function FilterSidebarMobile() {
  return (
    <Sheet>
      <SheetTrigger className="block lg:hidden">
        <Button size={'icon'}>
          <Filter strokeWidth={1} />
        </Button>
      </SheetTrigger>
      <SheetContent side={'left'} className="overflow-y-auto">
        <SheetHeader className="border-b pb-2">
          <SheetTitle>Product Filters</SheetTitle>
        </SheetHeader>
        <ECommerceFilterSidebar />
      </SheetContent>
    </Sheet>
  );
}
