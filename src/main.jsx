import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { MaterialUIControllerProvider } from "./context/materialUIControllerProvider.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render( 
    <React.StrictMode>
        <BrowserRouter>
            <MaterialUIControllerProvider>
                <App />
            </MaterialUIControllerProvider>
        </BrowserRouter>
    </React.StrictMode>, 
);
