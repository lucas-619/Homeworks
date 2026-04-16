import {Routes, Route} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Files from "./pages/Tasks";


function App() {
  return (
    
    <Routes>

      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />

      <Route element={<PrivateRoute/>}>
        <Route path="/files" element={<Files />} />
      </Route>
    </Routes>

  )
}

export default App