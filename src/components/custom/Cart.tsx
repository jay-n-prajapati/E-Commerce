import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { Button } from '../ui/button';

const Cart = ({ children }: { children: React.ReactNode }) => {
  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
          <SheetDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat,
            quam.
          </SheetDescription>
        </SheetHeader>
        
        <SheetFooter>
          <Button>Confirm Order</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
