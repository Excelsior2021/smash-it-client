import React, { useState, useEffect } from "react";
import { useNavigate, redirect } from "react-router-dom";

const AuthContext = React.createContext({
  isLoggedIn: null,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggeIn] = useState(false);
  const navigate = useNavigate();

  const login = () => {
    setIsLoggeIn(true);
  };

  const logout = async () => {
    await localStorage.removeItem("token");
    navigate("/");
    setIsLoggeIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
