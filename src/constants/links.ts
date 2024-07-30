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
      label: 'Home',
      slug: '/',
    },
    {
      label: 'Wishlist',
      slug: '/wishlist',
    },
    {
      label: 'Cart',
      slug: '/cart',
    },
  ],
  customer: [],
};
