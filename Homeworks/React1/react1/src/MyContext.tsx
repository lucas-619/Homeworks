import { createContext, type ReactNode } from "react"; 
import { useAuth } from "./useAuth"; 

type AuthContextType = {
  user: string | null;
  login: (userData: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

type Props = {
  children: ReactNode;
}

export function AuthProvider({children}: Props){

  const { user, login, logout} = useAuth(); 

  return( 

    <AuthContext.Provider value={{user, login, logout}}> 
      {children} 
    </AuthContext.Provider> 

  )
}