import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
  is_admin?: boolean;
}

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Load user from localStorage on every load
  useEffect(() => {
    const userJson = localStorage.getItem("user");
    if (userJson) {
      try {
        const parsed = JSON.parse(userJson);
        if (parsed && parsed.email) {
          setCurrentUser(parsed);
        }
      } catch (err) {
        console.error("Invalid user JSON");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await axios.post<User>(
        "http://localhost:4500/backend/auth/login",
        { email, password },
        { withCredentials: true }
      );
      setCurrentUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      setCurrentUser(null);
      localStorage.removeItem("user");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:4500/backend/auth/logout",
        {},
        { withCredentials: true }
      );
      setCurrentUser(null);
      localStorage.removeItem("user");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
