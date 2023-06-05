import { JwtPayload } from "jsonwebtoken";
import { createContext } from "react";

interface AuthContext {
  token: string | null;
  isAuthenticated: boolean;
  login: (accessToken: string) => void;
  logout: () => void;
  user: string | JwtPayload | null;
}

export const AuthContext = createContext<AuthContext>({
  token: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  user: null,
});
