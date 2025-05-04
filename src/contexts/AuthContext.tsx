
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { currentUser, mockStudents, mockTeachers, mockAdmins, mockParents } from '../data/mockData';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (userId: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for existing session in localStorage
    const storedUser = localStorage.getItem('schoolms_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (userId: string, password: string, role: UserRole): Promise<boolean> => {
    setLoading(true);

    // Simulate API call/authentication
    return new Promise((resolve) => {
      setTimeout(() => {
        let foundUser: User | undefined;
        
        // Find user based on role
        switch (role) {
          case 'student':
            foundUser = mockStudents.find(s => s.studentId === userId);
            break;
          case 'teacher':
            foundUser = mockTeachers.find(t => t.teacherId === userId);
            break;
          case 'admin':
            foundUser = mockAdmins.find(a => a.adminId === userId);
            break;
          case 'parent':
            foundUser = mockParents.find(p => p.parentId === userId);
            break;
        }

        if (foundUser && password === 'password') { // Simple password check for demo
          setUser(foundUser);
          localStorage.setItem('schoolms_user', JSON.stringify(foundUser));
          toast({
            title: "Login successful",
            description: `Welcome back, ${foundUser.name}!`,
          });
          setLoading(false);
          resolve(true);
        } else {
          toast({
            title: "Login failed",
            description: "Invalid credentials. Please try again.",
            variant: "destructive",
          });
          setLoading(false);
          resolve(false);
        }
      }, 1000); // Simulate network delay
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('schoolms_user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
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
