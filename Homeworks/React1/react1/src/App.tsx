import {Routes, Route} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import Register from "./pages/Register";


function App() {
  return (
    
    <Routes>

      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />

      <Route element={<PrivateRoute/>}>
        <Route path="/tasks" element={<Tasks />} />
      </Route>
    </Routes>

  )
}

export default App