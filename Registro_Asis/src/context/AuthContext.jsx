import { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [rol, setRol] = useState(null); // 'admin' o 'empleado'

  const login = (rolUsuario) => {
    setIsAuthenticated(true);
    setRol(rolUsuario);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRol(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, rol }}>
      {children}
    </AuthContext.Provider>
  );
}
