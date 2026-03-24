import { useContext } from "react";
import { AuthContext } from "./MyContext";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }: any) {
  const { user } = useContext(AuthContext);

  return user ? children : <Navigate to="/" />;
}