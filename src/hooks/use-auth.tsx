import jwt, { JwtPayload } from "jsonwebtoken";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<string | JwtPayload | null>(null);
  const router = useRouter();
  const isAuthenticated = !!token;

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  // Function to log in the user and store the token in localStorage
  const login = (token: string) => {
    console.log("TOKEN", token);
    localStorage.setItem("token", token);
    document.cookie = `accessToken=${token}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
    setToken(token);
    setUser(jwt.decode(token));
    router.push("/");
  };

  // Function to log out the user and remove the token from localStorage
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    router.push("/");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
      setUser(jwt.decode(storedToken));
    }
  }, []);

  return { headers, isAuthenticated, token, user, login, logout };
};

export default useAuth;
