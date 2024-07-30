import { UserRole } from "@/constants/enums";
import { PrivateRoutes, PublicRoutes } from "@/constants/routes";
import { type ClassValue, clsx } from "clsx"
import { NextRequest } from "next/server";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const hasAccessToURL = async (req: NextRequest, role: UserRole) => {
  if (PublicRoutes.includes(req.nextUrl.pathname)) return true;
  const accessibleRoute = PrivateRoutes[role];
  return accessibleRoute.includes(req.nextUrl.pathname);
};