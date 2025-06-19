import { createContext, useState, useEffect, type ReactNode } from "react";
import type { AuthContextType, DecodedToken, UserPayload } from "../types";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  loading: true
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserPayload | null>(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setUser({
          id: decoded.id,
          userName: decoded.userName,
          role: decoded.role,
        });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        console.error("Invalid token, logout automatically");
        localStorage.removeItem("token");
        setUser(null);
      }
    }
    setLoading(false); 
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    const decoded: DecodedToken = jwtDecode(token);
    setUser({
      id: decoded.id,
      userName: decoded.userName,
      role: decoded.role,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};