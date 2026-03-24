import { useContext, useState } from "react";
import { AuthContext } from "./MyContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email === "user@mail.com" && password === "123") {
      login(email);
      alert("Credenciales Correctas");
    } else {
      alert("Credenciales Incorrectas");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  

  return (
    <div>
      <input onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
      <button onClick={() => navigate("/Challenge-05")}>Challenge-05</button>
      <button onClick={() => navigate("/Challenge-04")}>Challenge-04</button>
      <button onClick={() => handleLogout()}>Logout</button>
    </div>
  );
}