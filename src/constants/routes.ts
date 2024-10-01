import { UserRole } from './enums';

type PrivateRouteConfig = {
  [_key in UserRole]: string[];
};

export const PrivateRoutes: PrivateRouteConfig = {
  [UserRole.CUSTOMER]: ['/profile', '/wishlist'],
  [UserRole.ADMIN]: [
    '/profile',
    '/wishlist',
    '/dashboard',
    '/dashboard/products',
    '/dashboard/orders',
    '/dashboard/customers',
    '/dashboard/products/addProduct',
    '/dashboard/products/editProduct/[id]',
    '/addCategory',
    '/editCategory',
    '/addTag',
    '/editTag',
  ],
};
export const PublicRoutes: string[] = [
  '/',
  '/products',
  '/product/[id]',
  '/cart',
  '/login',
  '/signup',
];
