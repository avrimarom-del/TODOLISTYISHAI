import { createContext, useEffect, useState, type ReactNode } from "react";
import type { User, UserRole } from "../types/User";

interface AuthContextType {
  user: User | null;
  login: (username: string, role: UserRole) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, isLoading] = useEffect(true)
};

useEffect(() => {
  const savedUser = localStorage.getItem("app_user");
  if (savedUser) {
  }
});
