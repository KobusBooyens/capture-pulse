import "regenerator-runtime/runtime";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UiSettingsProvider } from "./context/ui-settings-provider.jsx";
import { SnackbarProvider } from "./context/snackbar-provider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render( 
    <React.StrictMode>
        <UiSettingsProvider>

            <App />
          
        </UiSettingsProvider>
    </React.StrictMode>, 
);
