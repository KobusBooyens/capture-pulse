import React, { useEffect, useState } from "react";
import { setMiniSidenav, useUISettingsController } from "../../context/UISettingsProvider.jsx";
import { Outlet, useLocation } from "react-router-dom";
import brandDark from "../../assets/images/logo-dark.png";
import brandWhite from "../../assets/images/logo.png";
import { ThemeProvider } from "@mui/material/styles";
import themeDark from "../../assets/theme-dark/index.js";
import theme from "../../assets/theme/index.js";
import CssBaseline from "@mui/material/CssBaseline";
import Sidenav from "../../controls/Sidenav/Sidenav.jsx";
import menuItems from "./menuItems.jsx";
import DashboardNavbar from "../../controls/Navbars/DashboardNavbar/DashboardNavbar.jsx";
import DashboardLayout from "../../controls/LayoutContainers/DashboardLayout.jsx";
import Footer from "../../controls/Footer/Footer.jsx";
import { SnackbarProvider } from "../../context/SnackbarProvider.jsx";

const AppLayout = () => {
    const [controller, dispatch] = useUISettingsController();
    const {
        miniSidenav,
        sidenavColor,
        transparentSidenav,
        whiteSidenav,
        layout,
        darkMode,
    } = controller;
    const [onMouseEnter, setOnMouseEnter] = useState(false);
    const { pathname } = useLocation();
    const handleOnMouseEnter = () => {
        if (miniSidenav && !onMouseEnter) {
            setMiniSidenav(dispatch, false);
            setOnMouseEnter(true);
        }
    };

    const handleOnMouseLeave = () => {
        if (onMouseEnter) {
            setMiniSidenav(dispatch, true);
            setOnMouseEnter(false);
        }
    };

    useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
    }, [pathname]);

    const useDarkBrand = transparentSidenav && !darkMode || whiteSidenav;
    const brand = useDarkBrand ? brandDark : brandWhite;

    return (
        <>
            <ThemeProvider theme={darkMode ? themeDark : theme}>
                <SnackbarProvider>
                    <CssBaseline/>
                    {layout === "dashboard" &&
                        <>
                            <Sidenav
                                color={sidenavColor}
                                brand={brand}
                                brandName={"Capture Pulse"}
                                routes={menuItems}
                                onMouseEnter={handleOnMouseEnter}
                                onMouseLeave={handleOnMouseLeave}
                            />

                            <DashboardLayout>
                                <DashboardNavbar/>
                                <Outlet/>
                                <Footer/>
                            </DashboardLayout>
                        </>
                    }
                </SnackbarProvider>
            </ThemeProvider>
        </>
    );
};
export default AppLayout;
