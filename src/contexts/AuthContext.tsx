
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
  { id: '1', name: 'John Doe', email: 'user@example.com', password: 'password123', isAdmin: false },
  { id: '2', name: 'Admin User', email: 'admin@example.com', password: 'admin123', isAdmin: true },
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
    // Check if the email exists and password matches
    const user = mockUsers.find(
      user => user.email.toLowerCase() === email.toLowerCase() && user.password === password
    );
    
    if (user) {
      // Create a user object without the password to store in state and localStorage
      const { password: _, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword as User);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
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
