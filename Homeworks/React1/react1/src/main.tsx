import React from "react";
import ReactDOM from "react-dom/client";
import PrintMessage from "./PrintMessage";


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <PrintMessage message = 'Lista de Contactos'/>
    </React.StrictMode>
)

