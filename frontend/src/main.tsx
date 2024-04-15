import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/app.scss";

export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: Date;
  __v: number;
}
export interface ContextValue {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const Context = createContext<ContextValue>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  loading: false,
  setLoading: () => {},
  user: null,
  setUser: () => {},
});
const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        loading,
        setLoading,
        user,
        setUser,
      }}
    >
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
