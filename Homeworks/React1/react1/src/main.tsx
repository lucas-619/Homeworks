import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import TreeApp from './components/TreeApp'

ReactDOM.createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <TreeApp></TreeApp>
    </StrictMode>
);