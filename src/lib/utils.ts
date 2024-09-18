import { UserRole } from '@/constants/enums';
import { PrivateRoutes, PublicRoutes } from '@/constants/routes';
import { type ClassValue, clsx } from 'clsx';
import { NextRequest } from 'next/server';
import { twMerge } from 'tailwind-merge';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const hasAccessToURL = async (req: NextRequest, role: UserRole) => {
  if (PublicRoutes.includes(req.nextUrl.pathname)) return true;
  const accessibleRoute = PrivateRoutes[role];
  return accessibleRoute.includes(req.nextUrl.pathname);
};

export const generateSlug = (stringData: string) => {
  return stringData
    .toLowerCase() // Convert to lowercase
    .trim() // Remove whitespace from both ends of the string
    .replace(/[^a-z0-9\s-]/g, '') // Remove all non-alphanumeric characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Remove consecutive hyphens
};

// upload file to s3
export const uploadFile = async (file: File) => {
  const Bucket = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;
  const s3 = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY as string,
    },
  });
  const fileName = Date.now() + file.name;
  try {
    const uploadToS3 = new PutObjectCommand({
      Bucket,
      Key: fileName,
      Body: file,
    });
    await s3.send(uploadToS3);
    const url = process.env.NEXT_PUBLIC_IMAGE_BASEURL + fileName;
    return { success: true, data: url };
  } catch (error) {
    console.error(error);
    return { success: false, data: error };
  }
};
