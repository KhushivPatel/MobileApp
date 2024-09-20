// src/contexts/AuthContext.tsx
import React, {createContext, useState, ReactNode} from 'react';

// Define the type for the context
interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
}

// Create the context with an initial default value
export const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
});

// Define the props type for the AuthProvider
interface AuthProviderProps {
  children: ReactNode; // ReactNode ensures children can be any valid JSX
}

// Create the AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [token, setToken] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{token, setToken}}>
      {children}
    </AuthContext.Provider>
  );
};
