
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '@/types';
import { toast } from 'sonner';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes
const mockUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'user@example.com', isAdmin: false },
  { id: '2', name: 'Admin User', email: 'admin@example.com', isAdmin: true },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // Check for saved user in localStorage when component mounts
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // For demo, we'll just check if the email exists in our mock data
    // In a real app, you'd verify credentials against a backend
    const user = mockUsers.find(user => user.email.toLowerCase() === email.toLowerCase());
    
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      toast.success(`Welcome back, ${user.name}!`);
      return Promise.resolve();
    } else {
      toast.error('Invalid email or password');
      return Promise.reject('Invalid email or password');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
    toast.info('You have been logged out');
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      login,
      logout,
      isAuthenticated: !!currentUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
