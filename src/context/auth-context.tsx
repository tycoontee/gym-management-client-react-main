import * as React from 'react';
import { User } from '@/types';
import { sleep } from '@/utils.ts';
import { usersStorage, sessionStorage } from '@/utils/storage';
import { initializeSampleData } from '@/data/sample-data';

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  user: User | null;
  register: (
    email: string,
    password: string,
    name: string,
  ) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = React.createContext<AuthContextType | null>(null);

function getStoredUser() {
  const session = sessionStorage.get();
  return session ? session.user : null;
}

function setStoredUser(user: User | null) {
  if (user) {
    sessionStorage.save({
      user,
      loginTime: new Date().toISOString(),
    });
  } else {
    sessionStorage.clear();
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(getStoredUser());
  const isAuthenticated = !!user;

  // Initialize sample data on mount
  React.useEffect(() => {
    initializeSampleData();
  }, []);

  const logout = React.useCallback(async () => {
    setStoredUser(null);
    setUser(null);
    await sleep(250);
  }, []);

  const login = React.useCallback(
    async (
      email: string,
      password: string,
    ): Promise<{ success: boolean; error?: string }> => {
      await sleep(500);

      const user = usersStorage.authenticate(email, password);
      if (user) {
        setStoredUser(user);
        setUser(user);
        return { success: true };
      }

      return { success: false, error: 'Invalid email or password' };
    },
    [],
  );

  const register = React.useCallback(
    async (
      email: string,
      password: string,
      name: string,
    ): Promise<{ success: boolean; error?: string }> => {
      await sleep(500);

      // Check if user already exists
      if (usersStorage.findByEmail(email)) {
        return { success: false, error: 'Email already registered' };
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        email,
        password,
        name,
        role: 'member',
      };

      usersStorage.add(newUser);
      setStoredUser(newUser);
      setUser(newUser);

      return { success: true };
    },
    [],
  );

  React.useEffect(() => {
    setUser(getStoredUser());
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
