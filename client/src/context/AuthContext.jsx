import { createContext, useEffect, useState } from "react";
import authService from "../services/auth.service";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = authService.getUser();

    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const login = async (credentials) => {
    const response = await authService.login(credentials);

    setUser(response.data.user);

    return response;
  };

  const register = async (userData) => {
    return await authService.register(userData);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}