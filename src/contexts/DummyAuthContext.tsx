import React, { createContext, useContext, useState } from "react";
import { dummyUsers } from "@/lib/dummyData";

type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  created_at: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Default to the first dummy user for demonstration purposes
  const [user, setUser] = useState<User | null>(dummyUsers[0]);
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Find user by email (in a real app, would also check password)
      const foundUser = dummyUsers.find((u) => u.email === email);

      if (!foundUser) {
        throw new Error("Invalid login credentials");
      }

      setUser(foundUser);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      // Check if user already exists
      const existingUser = dummyUsers.find((u) => u.email === email);

      if (existingUser) {
        throw new Error("User with this email already exists");
      }

      // Create new user
      const newUser = {
        id: (dummyUsers.length + 1).toString(),
        email,
        name,
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
        created_at: new Date().toISOString(),
      };

      dummyUsers.push(newUser);
      setUser(newUser);
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
  };

  const value = {
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
