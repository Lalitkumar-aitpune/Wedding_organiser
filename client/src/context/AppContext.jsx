import { createContext, useContext, useMemo, useState } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [calculationResult, setCalculationResult] = useState(null);
  const [userAccount, setUserAccount] = useState(() => {
    const raw = localStorage.getItem("userAccount");
    return raw ? JSON.parse(raw) : null;
  });
  const [shopUser, setShopUser] = useState(() => {
    const raw = localStorage.getItem("shopUser");
    return raw ? JSON.parse(raw) : null;
  });
  const [adminUser, setAdminUser] = useState(() => {
    const raw = localStorage.getItem("adminUser");
    return raw ? JSON.parse(raw) : null;
  });

  const loginUserAccount = (user, token) => {
    localStorage.setItem("userAccount", JSON.stringify(user));
    localStorage.setItem("authToken", token);
    setUserAccount(user);
  };

  const logoutUserAccount = () => {
    localStorage.removeItem("userAccount");
    localStorage.removeItem("authToken");
    setUserAccount(null);
  };

  const loginShopUser = (user, token) => {
    localStorage.setItem("shopUser", JSON.stringify(user));
    localStorage.setItem("shopToken", token);
    localStorage.setItem("authToken", token);
    setShopUser(user);
  };

  const logoutShopUser = () => {
    localStorage.removeItem("shopUser");
    localStorage.removeItem("shopToken");
    localStorage.removeItem("authToken");
    setShopUser(null);
  };

  const loginAdminUser = (user, token) => {
    localStorage.setItem("adminUser", JSON.stringify(user));
    localStorage.setItem("authToken", token);
    setAdminUser(user);
  };

  const logoutAdminUser = () => {
    localStorage.removeItem("adminUser");
    localStorage.removeItem("authToken");
    setAdminUser(null);
  };

  const value = useMemo(
    () => ({
      calculationResult,
      setCalculationResult,
      userAccount,
      loginUserAccount,
      logoutUserAccount,
      shopUser,
      loginShopUser,
      logoutShopUser,
      adminUser,
      loginAdminUser,
      logoutAdminUser
    }),
    [calculationResult, userAccount, shopUser, adminUser]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used inside AppProvider");
  }
  return context;
};
