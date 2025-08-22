import axios from 'axios';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {jwtDecode} from "jwt-decode";

export interface User {
  applicationId: number;
  employeeId: number;
  teachersId: number;
  fullName: string;
  email: string;
  isAdmin: boolean;
  exp?: number | 0;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    // Check for stored user data on app load
    const storedUser = localStorage.getItem('userProfile');
    const storedToken = localStorage.getItem('token');
    const storedExp = localStorage.getItem('exp');
    const expiryDate = new Date(storedExp!);
    const currentDate = new Date();
    if (currentDate > expiryDate) {
      logout();
      return;
    }
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('userProfile');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    try {
      // Simulate API call - in real app, this would be an actual API endpoint
      const response = await axios.post('auth/login', { email, password });
      const { token, ...userData } = response.data;
      const decodedToken = jwtDecode<User>(response.data.token);
      console.log(decodedToken);
      const expiryDate = new Date(decodedToken.exp! * 1000);
      console.log("Token expires at:", expiryDate.toLocaleString());
      // Mock authentication logic
      // let userData: User | null = null;
      
      // if (email === 'admin@school.com' && password === 'admin123') {
      //   userData = {
      //     id: '1',
      //     name: 'Admin User',
      //     email: 'admin@school.com',
      //     role: 'admin'
      //   };
      // } else if (email === 'teacher@school.com' && password === 'teacher123') {
      //   userData = {
      //     id: '2',
      //     name: 'John Smith',
      //     email: 'teacher@school.com',
      //     role: 'teacher'
      //   };
      // } else if (email === 'teacher2@school.com' && password === 'teacher123') {
      //   userData = {
      //     id: '3',
      //     name: 'Sarah Johnson',
      //     email: 'teacher2@school.com',
      //     role: 'teacher'
      //   };
      //}
      
      if (userData) {
        setUser(userData);
        localStorage.setItem('userProfile', JSON.stringify(userData));
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('exp', JSON.stringify(expiryDate));
        setLoading(false);
        return true;
      } else {
        setLoading(false);
        return false;
      }
    } catch (error) {
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userProfile');
    localStorage.removeItem('token');
    localStorage.removeItem('exp');
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    loading,
    isCollapsed,
    setIsCollapsed
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
