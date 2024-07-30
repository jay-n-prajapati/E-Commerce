'use client'

import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { Session } from 'next-auth';

const SessionProviderWrapper = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default SessionProviderWrapper;
