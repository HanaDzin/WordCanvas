import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  //to store & retrieve the API generated token from localStorage - enables login and signup
  const [token, setToken] = useState(localStorage.getItem("token"));

  //to keep track of user's credits
  const [credit, setCredit] = useState(false);

  //to make backend url accessible in whole app
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const loadCreditsData = async () => {
    try {
      const { data } = await axios.get(backendURL + "/api/user/credits", {
        headers: { token },
      });

      if (data.success) {
        setCredit(data.credits);
        setUser(data.user);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };

  useEffect(() => {
    if (token) {
      loadCreditsData();
    }
  }, [token]);

  const contextValues = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    token,
    setToken,
    credit,
    setCredit,
    backendURL,
    loadCreditsData,
    logout,
  };

  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
}
