import { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return <div className="h-screen w-full">{children}</div>;
};

export default AuthLayout;
