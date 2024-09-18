import "regenerator-runtime/runtime";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UISettingsProvider } from "./context/UISettingsProvider.jsx";
import AuthProvider from "./context/AuthProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render( 
    <React.StrictMode>
        <AuthProvider>
            <UISettingsProvider>
                <App />
            </UISettingsProvider>
        </AuthProvider>
    </React.StrictMode>, 
);
