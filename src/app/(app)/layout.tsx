import AppDataProvider from '@/providers/AppDataProvider';
import { ReactNode } from 'react';

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AppDataProvider>
      <div className="h-screen w-full">{children}</div>
    </AppDataProvider>
  );
};

export default AppLayout;
