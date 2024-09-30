import QueryClientProviderWrapper from '@/providers/QueryClientProvider';
import SessionProviderWrapper from '@/providers/SessionProvideWrapper';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { getServerSession } from 'next-auth';
import React from 'react';

export default async function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <>
      <SessionProviderWrapper session={session!}>
        <QueryClientProviderWrapper>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </QueryClientProviderWrapper>
      </SessionProviderWrapper>
    </>
  );
}
