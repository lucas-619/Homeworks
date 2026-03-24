import {Routes, Route} from "react-router-dom";
import AdministrarUsuarios from './AdministrarUsuarios';
import PrivateRoute from "./PrivateRoute";
import Login from "./Login";
import LibrosManage from "./LibrosManage";

function App() {
  return (
    
    <Routes>

      <Route path="/" element={<Login/>} />

      <Route element={<PrivateRoute/>}>

        <Route path="/Challenge-05" element={<AdministrarUsuarios />} />
        <Route path="/Challenge-04" element={<LibrosManage />} />
        
      </Route>
    </Routes>

  )
}

export default App