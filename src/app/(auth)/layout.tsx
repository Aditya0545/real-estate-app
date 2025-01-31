'use client';

import { UserProvider } from '@/contexts/UserContext';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  );
} 