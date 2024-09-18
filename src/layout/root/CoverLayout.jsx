import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "../../context/SnackbarProvider.jsx";
import PageLayout from "../../controls/LayoutContainers/PageLayout.jsx";
import themeDark from "../../assets/theme-dark/index.js";
import theme from "../../assets/theme/index.js";
import { useUISettingsController } from "../../context/UISettingsProvider.jsx";
import { ThemeProvider } from "@mui/material/styles";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider.jsx";

const CoverLayout = () => {
    const [controller] = useUISettingsController();
    const { darkMode } = controller;
    const { authToken, currentUser } = useAuth();
    const [isLoggedIn, setIsLoggedIn] = useState(authToken && currentUser);
    
    if (isLoggedIn) {
        return <Navigate to={"/dashboard"}/>;
    }

    return (
        <>
            <ThemeProvider theme={darkMode ? themeDark : theme}>
                <SnackbarProvider>
                    <CssBaseline/>
                    <PageLayout>
                        <Outlet/>
                    </PageLayout>
                </SnackbarProvider>
            </ThemeProvider>
        </>
    );
};

export default CoverLayout;
