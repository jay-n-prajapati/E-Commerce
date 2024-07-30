import { UserRole } from './enums';

type PrivateRouteConfig = {
  [key in UserRole]: string[];
};

export const PrivateRoutes: PrivateRouteConfig = {
  [UserRole.ADMIN]: ['/dashboard'],
  [UserRole.CUSTOMER]: ['/profile', '/wishlist', '/cart'],
};
export const PublicRoutes: string[] = ['/access-denied', '/', '/login'];
