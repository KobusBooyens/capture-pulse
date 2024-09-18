import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "../../context/snackbar-provider.jsx";
import PageLayout from "../../controls/LayoutContainers/PageLayout.jsx";
import themeDark from "../../assets/theme-dark/index.js";
import theme from "../../assets/theme/index.js";
import { useUISettingsController } from "../../context/ui-settings-provider.jsx";
import { ThemeProvider } from "@mui/material/styles";
import { Outlet } from "react-router-dom";

const CoverLayout = () => {
    const [controller] = useUISettingsController();
    const { darkMode } = controller;

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
