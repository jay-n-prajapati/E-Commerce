'use client';

import { Heart, ShoppingBag, ShoppingCartIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import useAuthSession from '@/hooks/useAuthSession';
import ECommerceAvatar from '../ui/common/ECommerceAvatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import Cart from './Cart';
import { signOut } from 'next-auth/react';
import { ECommerceThemeSwitch } from '../ui/common/ECommerceThemeSwitch';

const Navbar = () => {
  const { isAuthenticated, user } = useAuthSession();
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
        <div className="flex items-center gap-4">
          <div>
            {/* {NavLinks[role].map((link, idx) => ( */}
            {/* {NavLinks['admin'].map((link, idx) => (
              <Link href={link.slug} key={idx}>
                <Button size={'icon'}>{link.label}</Button>
              </Link>
            ))} */}
          </div>
          <div>
            <div>
              <Heart className="text-primary hover:text-foreground" />
            </div>
          </div>
          <Cart>
            <div className="relative">
              <span className="absolute -right-2 -top-2 size-5 rounded-full bg-primary text-sm text-secondary">
                10
              </span>
              <ShoppingBag className="text-primary hover:text-foreground" />
            </div>
          </Cart>
          <div>
            {!isAuthenticated ? (
              <Link href={'/login'}>
                <Button variant={'default'} size={'lg'}>
                  Login
                </Button>
              </Link>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className="focus-visible:outline-none focus-visible:ring-0">
                  <ECommerceAvatar
                    src={user?.image ?? ''}
                    username={user?.name ?? ''}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link href={'/profile'}>
                      <Button variant={'link'}>Profile</Button>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button variant={'link'} onClick={() => signOut()}>
                      Logout
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          <div>
            <ECommerceThemeSwitch />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
