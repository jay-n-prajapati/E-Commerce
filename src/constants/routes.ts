import { UserRole } from './enums';

type PrivateRouteConfig = {
  [_key in UserRole]: (string | RegExp)[];
};

export const PublicRoutes: (string | RegExp)[] = [
  '/',
  '/products',
  /^\/product\/.*$/, // Matches dynamic product routes like /product/123
  '/cart',
  '/login',
  '/signup',
];

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
    /^\/dashboard\/products\/editProduct\/.*$/, // Matches /dashboard/products/editProduct/123
    '/addCategory',
    '/editCategory',
    '/addTag',
    '/editTag',
  ],
};
