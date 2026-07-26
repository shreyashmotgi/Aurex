import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import { loginUser, googleLogin } from "../api/authApi";
import {
  clearToken,
  getToken,
  setToken,
} from "../utils/tokenStorage";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // Restore token after refresh
  const [token, setTokenState] = useState(() => getToken());

  // Restore user after refresh
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");

    return storedUser
      ? JSON.parse(storedUser)
      : null;
  });

  const isAuthenticated = Boolean(token);

  const login = useCallback(async (credentials) => {
    const data = await loginUser(credentials);

    // Save token
    setToken(data.token);
    setTokenState(data.token);

    // Save user
    setUser(data.user);
    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

    return data;
  }, []);

  const googleSignIn = useCallback(async (credential) => {
  const data = await googleLogin(credential);

  // Save token
  setToken(data.token);
  setTokenState(data.token);

  // Save user
  setUser(data.user);
  localStorage.setItem(
    "user",
    JSON.stringify(data.user)
  );

  return data;
}, []);

  const logout = useCallback(() => {
    clearToken();

    setTokenState(null);

    setUser(null);

    localStorage.removeItem("user");

    navigate("/login", {
      replace: true,
    });
  }, [navigate]);

 const value = useMemo(
  () => ({
    token,
    user,
    isAuthenticated,
    login,
    googleSignIn,
    logout,
  }),
  [
    token,
    user,
    isAuthenticated,
    login,
    googleSignIn,
    logout,
  ]
);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      "useAuth must be used within an AuthProvider"
    );
  }

  return context;
};

export default AuthContext;