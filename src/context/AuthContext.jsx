import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const savedUser = localStorage.getItem("dal_user");
    const savedToken = localStorage.getItem("dal_token");

    if (savedUser && savedToken) {
      setCurrentUser(JSON.parse(savedUser));
      setToken(savedToken);
    }

    setLoading(false);

  }, []);

  const login = (userData, jwtToken) => {

    setCurrentUser(userData);
    setToken(jwtToken);

    localStorage.setItem(
      "dal_user",
      JSON.stringify(userData)
    );

    localStorage.setItem(
      "dal_token",
      jwtToken
    );
  };

  const logout = () => {

    setCurrentUser(null);
    setToken(null);

    localStorage.removeItem("dal_user");
    localStorage.removeItem("dal_token");
  };

  const isAdmin = () =>
    currentUser?.role === "ADMIN";

  const isManager = () =>
    currentUser?.role === "MANAGER";

  const isUser = () =>
    currentUser?.role === "USER";

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        token,
        loading,
        login,
        logout,
        isAdmin,
        isManager,
        isUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}