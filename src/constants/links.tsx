import {
  Home,
  LayoutDashboard,
  LogIn,
  Package2,
  PackageSearch,
  ShoppingCart,
  User,
  Users2,
} from 'lucide-react';

import { ReactNode } from 'react';

export type LinkItem = {
  label: string;
  slug: string;
  icon?: (_username?: string, _image?: string) => ReactNode;
  visible?: (_isAuthenticated: boolean, _userRole?: string) => boolean;
};

enum LinkType {
  SideBar = 'SideBar',
  Menubar = 'MenuBar',
}

/** Links Type in which key must be of one of the UserRole */
export type Links = {
  [_key in LinkType]: LinkItem[];
};

export const NavLinks: Links = {
  SideBar: [
    {
      label: 'dashboard',
      slug: '/dashboard',
      icon: () => <Home />,
    },
    {
      label: 'customers',
      slug: '/dashboard/customers',
      icon: () => <Users2 />,
    },
    {
      label: 'products',
      slug: '/dashboard/products',
      icon: () => <Package2 />,
    },
    {
      label: 'orders',
      slug: '/dashboard/orders',
      icon: () => <ShoppingCart />,
    },
  ],
  MenuBar: [
    {
      label: 'Home',
      slug: '/',
      icon: () => <Home />,
      visible: () => true,
    },
    {
      label: 'Products',
      slug: '/products',
      icon: () => <PackageSearch />,
      visible: () => true,
    },
    {
      label: 'Cart',
      slug: '/cart',
      icon: () => <ShoppingCart />,
      visible: () => true,
    },
    {
      label: 'Dashboard',
      slug: '/dashboard',
      icon: () => <LayoutDashboard />,
      visible: (isAuthenticated, userRole) =>
        isAuthenticated && userRole! === 'admin',
    },

    {
      label: 'Login',
      slug: '/login',
      icon: () => <LogIn />,
      visible: (isAuthenticated) => !isAuthenticated,
    },
    {
      label: 'Profile',
      slug: '/profile',
      icon: () => <User />,
      visible: (isAuthenticated) => isAuthenticated,
    },
  ],
};
