import { useContext } from "react";
import { AuthContext } from "./MyContext";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const { user } = useContext(AuthContext);
  console.log("USER:", user);
  return user ? <Outlet /> : <Navigate to="/" />;
}