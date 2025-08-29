import { createContext, StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

export const Context = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  isLoading: false,
  setIsLoading: () => {},
  user: null,
  setUser: () => {},
});

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState();

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        isLoading,
        setIsLoading,
      }}
    >
      <App />
    </Context.Provider>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);
