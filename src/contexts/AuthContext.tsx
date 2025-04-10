
import React, { createContext, useContext, useState, useEffect } from 'react';

type UserRole = 'user' | 'agency' | 'admin';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  agencyId?: string; // For agency staff
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole, agencyName?: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAgency: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Admin credentials
// email: admin@insure360.com
// password: admin123

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('insure360_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Mock login function - in a real app, this would call an API
  const login = async (email: string, password: string, role: UserRole) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes - mock users
      let user: User;
      
      // Check for admin credentials
      if (email === 'admin@insure360.com' && password === 'admin123') {
        user = {
          id: 'admin-123',
          name: 'Admin User',
          email: email,
          role: 'admin'
        };
      } else if (role === 'user') {
        user = {
          id: 'user-123',
          name: 'John Doe',
          email: email,
          role: 'user'
        };
      } else if (role === 'agency') {
        user = {
          id: 'agency-123',
          name: 'ABC Insurance',
          email: email,
          role: 'agency',
          agencyId: 'agency-123'
        };
      } else {
        throw new Error('Invalid credentials');
      }
      
      setCurrentUser(user);
      localStorage.setItem('insure360_user', JSON.stringify(user));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Mock registration function
  const register = async (name: string, email: string, password: string, role: UserRole, agencyName?: string) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let user: User;
      
      if (role === 'user') {
        user = {
          id: `user-${Date.now()}`,
          name: name,
          email: email,
          role: 'user'
        };
      } else if (role === 'agency') {
        const agencyId = `agency-${Date.now()}`;
        user = {
          id: `agency-staff-${Date.now()}`,
          name: name,
          email: email,
          role: 'agency',
          agencyId: agencyId
        };
      } else {
        user = {
          id: `admin-${Date.now()}`,
          name: name,
          email: email,
          role: 'admin'
        };
      }
      
      setCurrentUser(user);
      localStorage.setItem('insure360_user', JSON.stringify(user));
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('insure360_user');
  };

  const value = {
    currentUser,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!currentUser,
    isAgency: currentUser?.role === 'agency',
    isAdmin: currentUser?.role === 'admin',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
