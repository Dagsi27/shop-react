import React, { createContext, useState, useContext, useEffect } from "react";
import localStorageService from "../services/localStorage.service";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  
  // Inicjalizacja stanu z localStorage przy starcie aplikacji
  useEffect(() => {
    const savedToken = localStorageService.getItem("token");
    const savedEmail = localStorageService.getItem("email");
    
    if (savedToken) {
      setToken(savedToken);
    }
    
    if (savedEmail) {
      setUser({ email: savedEmail });
    }
  }, []);
  
  const login = (email, token) => {
    const userData = { email };
    setUser(userData);
    setToken(token);
    
    // Zapisz dane do localStorage
    localStorageService.setItem("token", token);
    localStorageService.setItem("email", email);
  };
  
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorageService.clear();
  };
  
  return (
    <UserContext.Provider value={{ user, token, login, logout }}>
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