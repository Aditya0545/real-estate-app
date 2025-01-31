'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface UserData {
  name: string;
  email: string;
  role: string;
  // ... other user data
}

interface UserContextType {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    role: 'Real Estate Agent',
    // ... other initial data
  });

  useEffect(() => {
    // Get user data from localStorage on component mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserData(prev => ({
        ...prev,
        name: parsedUser.name || '',
        email: parsedUser.email || '',
      }));
    }
  }, []);

  const updateUserData = (data: Partial<UserData>) => {
    setUserData(prev => {
      const newData = { ...prev, ...data };
      // Update localStorage when user data changes
      localStorage.setItem('user', JSON.stringify(newData));
      return newData;
    });
  };

  return (
    <UserContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 