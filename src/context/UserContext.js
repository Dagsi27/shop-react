import React, { createContext, useState, useContext } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  const login = (userData, token, refreshToken) => {
    setUser(userData);
    setToken(token);
    setRefreshToken(refreshToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setRefreshToken(null);
  };

  const updateTokens = (newToken, newRefreshToken) => {
    setToken(newToken);
    setRefreshToken(newRefreshToken);
  };

  return (
    <UserContext.Provider value={{ user, token, refreshToken, login, logout, updateTokens }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
