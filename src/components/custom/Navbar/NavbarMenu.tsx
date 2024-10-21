'use client';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import useAuthSession from '@/hooks/useAuthSession';
import { LogOut, Menu } from 'lucide-react';
import Link from 'next/link';
import { NavLinks } from '@/constants/links';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function NavbarMenu() {
  const { isAuthenticated, user, role } = useAuthSession();
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="size-6" />
      </SheetTrigger>
      <SheetContent side={'right'}>
        <div className="flex flex-col py-8">
          {NavLinks['MenuBar']?.map((link, idx) => {
            if (link.visible!(isAuthenticated, role)) {
              return (
                <SheetClose key={idx} asChild>
                  <Link
                    href={link.slug}
                    className={cn(
                      'flex cursor-pointer items-center gap-4 rounded p-3 text-lg font-semibold transition-all duration-300',
                      pathname === link.slug
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-secondary hover:text-secondary-foreground'
                    )}
                  >
                    <span>
                      {link.icon!(user?.name as string, user?.image as string)}
                    </span>
                    <p>{link.label}</p>
                  </Link>
                </SheetClose>
              );
            }
          })}

          {isAuthenticated && (
            <SheetClose asChild>
              <div
                className={
                  'flex cursor-pointer items-center gap-4 rounded p-4 text-lg font-semibold transition-all duration-300 hover:bg-secondary hover:text-secondary-foreground'
                }
                onClick={() => signOut()}
              >
                <span>
                  <LogOut />
                </span>
                <p>Logout</p>
              </div>
            </SheetClose>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
