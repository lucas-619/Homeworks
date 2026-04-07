import { createContext } from "react";
import { useAuthFirebase } from "../hook/useAuthFirebase";

export const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: any) {
  const auth = useAuthFirebase();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}