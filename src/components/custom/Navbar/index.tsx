import { ShoppingCartIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { ECommerceThemeSwitch } from '@/components/ui/common/ECommerceThemeSwitch';
import NavbarMenu from './NavbarMenu';

const Navbar = () => {
  return (
    <header className="fixed left-0 top-0 z-50 h-20 w-screen bg-secondary">
      <div className="container mx-auto flex h-full items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold"
            prefetch={false}
          >
            <ShoppingCartIcon className="size-7 text-primary" />
            <p className="hidden text-lg sm:block">E-Commerce</p>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <ECommerceThemeSwitch />
          <NavbarMenu />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
