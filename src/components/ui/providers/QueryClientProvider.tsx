'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

export const queryCLient = new QueryClient();
const QueryClientProviderWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <QueryClientProvider client={queryCLient}>{children}</QueryClientProvider>
  );
};

export default QueryClientProviderWrapper;
