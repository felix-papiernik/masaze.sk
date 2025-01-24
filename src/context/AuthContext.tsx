"use client";

import { Auth } from "@/lib/types";
import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  auth: Auth | null;
  setAuth: (auth: Auth | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
  initialAuth,
}: {
  children: ReactNode;
  initialAuth: Auth | null;
}) {
  const [auth, setAuth] = useState<Auth | null>(initialAuth);

  return (
    <AuthContext.Provider value={{ auth: auth, setAuth: setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}
