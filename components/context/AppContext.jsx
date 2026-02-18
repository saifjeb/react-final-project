import React, { createContext, useEffect, useMemo, useState } from "react";

export const AppContext = createContext(null);

const LS_KEY = "auraCafeState_v1";

const demoMenu = [
  {
    id: "m1",
    name: "Blueberry Muffin",
    price: 2.75,
    category: "Bakery",
    description: "Freshly baked muffin with juicy blueberries.",
    status: "available",
    image: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&w=300&q=60",
  },
  {
    id: "m2",
    name: "Avocado Toast",
    price: 6.0,
    category: "Breakfast",
    description: "Smashed avocado, lemon, and chili flakes on sourdough.",
    status: "available",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=300&q=60",
  },
  {
    id: "m3",
    name: "Cappuccino",
    price: 3.5,
    category: "Coffee",
    description: "Espresso with steamed milk and a light layer of foam.",
    status: "available",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=300&q=60",
  },
];

const demoEmployees = [
  {
    id: "e1",
    name: "John Smith",
    email: "john@auracafe.com",
    role: "employee",
    status: "active",
    image: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=300&q=60",
  },
  {
    id: "e2",
    name: "Emma Wilson",
    email: "emma@auracafe.com",
    role: "employee",
    status: "active",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=60",
  },
];

function loadState() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function AppProvider({ children }) {
  const saved = loadState();

  const [theme, setTheme] = useState(saved?.theme ?? "light");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(saved?.sidebarCollapsed ?? false);
  const [user, setUser] = useState(saved?.user ?? null); // { role, name }

  const [menuItems, setMenuItems] = useState(saved?.menuItems ?? demoMenu);
  const [employees, setEmployees] = useState(saved?.employees ?? demoEmployees);


  const [draftReservation, setDraftReservation] = useState(
    saved?.draftReservation ?? {
      name: "",
      email: "",
      role: "customer",
      status: "active",
      imageUrl: "",
    }
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const state = { theme, sidebarCollapsed, user, menuItems, employees, draftReservation };
    localStorage.setItem(LS_KEY, JSON.stringify(state));
  }, [theme, sidebarCollapsed, user, menuItems, employees, draftReservation]);

  const login = ({ role, name, password }) => {

    const ok =
      (role === "manager" && password === "manager") ||
      (role === "employee" && password === "employee") ||
      (role === "customer" && password === "customer");

    if (!ok) return { ok: false, message: "Wrong password. Try: manager / employee / customer" };

    setUser({ role, name: name?.trim() || role.toUpperCase() });
    return { ok: true };
  };

  const logout = () => setUser(null);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      sidebarCollapsed,
      setSidebarCollapsed,
      user,
      setUser,
      login,
      logout,
      menuItems,
      setMenuItems,
      employees,
      setEmployees,
      draftReservation,
      setDraftReservation,
    }),
    [theme, sidebarCollapsed, user, menuItems, employees, draftReservation]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
