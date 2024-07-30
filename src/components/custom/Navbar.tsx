'use client';

import { ShoppingCartIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import useAuthSession from '@/hooks/useAuthSession';
import { NavLinks } from '@/constants/links';
import ECommerceAvatar from '../ui/common/ECommerceAvatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { ThemeSwitch } from './ThemeSwitch';

const Navbar = () => {
  const { isAuthenticated, role, user } = useAuthSession();
  return (
    <header className="h-20 bg-primary">
      <div className="container h-full mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold"
            prefetch={false}
          >
            <ShoppingCartIcon className="size-7" />
            <span>E-Commerce</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <div>
            {/* {NavLinks[role].map((link, idx) => ( */}
            {NavLinks['admin'].map((link, idx) => (
              <Link href={link.slug} key={idx}>
                <Button size={'sm'}>{link.label}</Button>
              </Link>
            ))}
          </div>
          <div>
            <ThemeSwitch />
          </div>
          <div>
            {!isAuthenticated ? (
              <Link href={'/login'}>
                <Button variant={'secondary'} size={'lg'}>
                  Login
                </Button>
              </Link>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className='focus-visible:ring-0 focus-visible:outline-none'>
                  <ECommerceAvatar src={user.image!} username={user.name!} />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link href={'/profile'}>
                      <Button variant={'link'}>Profile</Button>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button variant={'link'}>Logout</Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
