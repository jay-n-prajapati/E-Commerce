import { Home, Package2, ShoppingCart, Users2 } from 'lucide-react';
import { UserRole } from './enums';

export type LinkItem = {
  label: string;
  slug: string;
  icon?: React.ReactNode;
};

/** Links Type in which key must be of one of the UserRole */
export type Links = {
  [key in UserRole]?: LinkItem[];
};

export const NavLinks: Links = {
  admin: [
    {
      label: 'dashboard',
      slug: '/dashboard',
      icon: <Home />,
    },
    {
      label: 'customers',
      slug: '/customers',
      icon: <Users2 />,
    },
    {
      label: 'products',
      slug: '/products',
      icon: <Package2 />,
    },
    {
      label: 'orders',
      slug: '/orders',
      icon: <ShoppingCart />,
    },
  ],
  customer: [],
};
