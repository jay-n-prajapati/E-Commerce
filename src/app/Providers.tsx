import QueryClientProviderWrapper from '@/components/providers/QueryClientProvider';
import SessionProviderWrapper from '@/components/providers/SessionProvideWrapper';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
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
