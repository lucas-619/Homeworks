import { Routes, Route } from "react-router-dom"
import CancionesPage from "./CancionesPage"
import HistorialPage from "./HistorialNavegador"

function App() {

  return (
    <Routes>
      <Route path="/" element={<h1>Inicio</h1>} />
      <Route path="/listas-enlazadas" element={<CancionesPage />} />
      <Route path="/listas-dobles" element={<HistorialPage />} />
    </Routes>
  )

}

export default App