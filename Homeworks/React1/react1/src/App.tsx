import { Routes, Route, Navigate } from "react-router-dom";
import Spotify from "./components/Spotify";


function App() {
    return (
        <Routes>
            <Route path="/" element={<Spotify />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default App;