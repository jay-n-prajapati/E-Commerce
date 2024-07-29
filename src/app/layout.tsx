import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <html lang="en" className="dark">
    <html lang="en">
      <body className={`${inter.className} h-screen w-full bg-red-300`}>
        <Toaster />
        <div>{children}</div>
      </body>
    </html>
  );
}
