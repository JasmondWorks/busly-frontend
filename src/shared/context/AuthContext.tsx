import { createContext, useContext, useState, type ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'commuter' | 'admin' | 'contributor' | 'driver';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: () => void;
  logout: () => void;
  toggleRole: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Default to MOCK USER for demo, or null if strictly following "guest first"
  // User requested "factor in what user should see when they are authenticated or not"
  // so we'll start with NULL (Guest) to show the difference, but provide easy login.
  const [user, setUser] = useState<User | null>({
    id: 'u1',
    name: 'Jasmond',
    email: 'jasmond@busly.app',
    role: 'commuter',
  });

  const login = () => {
    setUser({
      id: 'u1',
      name: 'Jasmond',
      email: 'jasmond@busly.app',
      role: 'commuter',
    });
  };

  const logout = () => {
    setUser(null);
  };

  const toggleRole = () => {
    setUser((prev) => {
      if (!prev) return null;
      const nextRole = prev.role === 'commuter' ? 'driver' : 'commuter';
      return { ...prev, role: nextRole };
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, toggleRole, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
