import { createContext, useState, useEffect, type ReactNode } from "react";
import type { UserPayload } from "../types";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  user: UserPayload | null;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserPayload | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const decodedUser: any = jwtDecode(token);
      setUser({
        id: decodedUser.id,
        userName: decodedUser.userName,
        role: decodedUser.role,
      });
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decodedUser: any = jwtDecode(token);
    setUser({
      id: decodedUser.id,
      userName: decodedUser.userName,
      role: decodedUser.role,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};