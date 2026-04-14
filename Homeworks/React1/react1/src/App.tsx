import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { menuTree } from "./data/menuTree";
import { renderRoutes } from "./utils/renderRoutes";

function App() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ padding: "2rem", flex: 1 }}>
        <Routes>

          {/* Ruta inicial */}
          <Route path="/" element={<h2>Home</h2>} />

          {/* Rutas dinámicas */}
          {menuTree.children?.flatMap((node) => renderRoutes(node))}

        </Routes>
      </div>
    </div>
  );
}

export default App;