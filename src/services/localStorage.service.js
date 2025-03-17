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

class LocalStorageService {
  static instance;

  constructor() {
    if (!LocalStorageService.instance) {
      LocalStorageService.instance = this;
    }
    return LocalStorageService.instance;
  }

  setItem(key, value) {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error("Error saving to localStorage", error);
    }
  }

  getItem(key) {
    try {
      const serializedValue = localStorage.getItem(key);
      return serializedValue ? JSON.parse(serializedValue) : null;
    } catch (error) {
      console.error("Error reading from localStorage", error);
      return null;
    }
  }

  removeItem(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing from localStorage", error);
    }
  }

  clear() {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing localStorage", error);
    }
  }
}

const localStorageService = new LocalStorageService();
export default localStorageService;
