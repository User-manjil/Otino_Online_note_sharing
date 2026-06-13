import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [inputData, setInputData] = useState("");

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (!t) return;

    const base = import.meta.env.VITE_API_BASE_URL || "";
    fetch(`${base}/me.php`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${t}`,
      },
    })
      .then(async (r) => {
        const data = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(data.error || "Failed to fetch user");
        return data;
      })
      .then((data) => setUser(data.user))
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      });
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        loggedIn: !!user,
        setUser,
        inputData,
        setInputData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

