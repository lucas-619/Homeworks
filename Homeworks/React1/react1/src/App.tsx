import {Routes, Route, Link} from "react-router-dom";
import AdministrarUsuarios from './Page 2/AdministrarUsuarios';
import PrivateRoute from "./PrivateRoute";
import Login from "./Login";

function App() {
  return (
    
    <Routes>

      <Route path="/" element={<Login/>} />


      <Route element={<PrivateRoute/>}>
        <Route path="/Challenge-04" element={<AdministrarUsuarios />} />
      </Route>
    </Routes>

  )
}

export default App