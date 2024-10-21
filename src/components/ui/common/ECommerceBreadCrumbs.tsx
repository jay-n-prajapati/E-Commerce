'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { cn } from '@/lib/utils';
import Link from 'next/link';

import { usePathname } from 'next/navigation';

export default function ECommerceBreadCrumbs() {
  const pathname = usePathname();
  const paths = pathname.split('/').filter((path) => path);

  return (
    <Breadcrumb>
      <BreadcrumbList className="text-lg">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {paths.map((path, idx) => {
          const href = `/${paths.slice(0, idx + 1).join('/')}`;
          return (
            <BreadcrumbItem key={href} className="flex items-center">
              <BreadcrumbLink asChild>
                <Link
                  href={href}
                  className={cn(
                    'capitalize',
                    href === pathname ? 'font-bold text-primary' : ''
                  )}
                >
                  {path}
                </Link>
              </BreadcrumbLink>
              {idx + 1 === paths.length || paths.length === 1 ? null : (
                <BreadcrumbSeparator />
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
