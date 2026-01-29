import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'commuter' | 'admin' | 'contributor';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: () => void;
  logout: () => void;
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

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
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
