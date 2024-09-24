import React, { useEffect, useState } from "react";
import { setMiniSidenav, setOpenConfigurator, useUISettingsController } from "../../context/UISettingsProvider.jsx";
import { Outlet, useLocation } from "react-router-dom";
import brandDark from "../../assets/images/logo-dark.png";
import brandWhite from "../../assets/images/logo.png";
import logo from "../../assets/images/logo-capture_pulse.png";
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
import { useAuth } from "../../context/AuthProvider.jsx";
import Icon from "@mui/material/Icon";
import Box from "../../components/Box/Box.jsx";
import TodoList from "../../controls/TodoList/TodoList.jsx";
import Configurator from "../../controls/Configurator/Configurator.jsx";

const AppLayout = () => {
    const [controller, dispatch] = useUISettingsController();
    const {
        miniSidenav,
        openConfigurator,
        sidenavColor,
        transparentSidenav,
        whiteSidenav,
        layout,
        darkMode,
    } = controller;
    const [onMouseEnter, setOnMouseEnter] = useState(false);
    const { pathname } = useLocation();
    const { currentUser } = useAuth();
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

    const handleTodoOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

    const toDoListButton =
        <Box display="flex"
            justifyContent="center"
            alignItems="center"
            width="3.25rem"
            height="3.25rem"
            bgColor="white"
            shadow="sm"
            borderRadius="50%"
            position="fixed"
            right="2rem"
            bottom="2rem"
            zIndex={99}
            color="dark"
            sx={{ cursor: "pointer" }}
            onClick={handleTodoOpen}
        >
            <Icon fontSize="small" color="inherit">
              add_task
            </Icon>
        </Box>
    ;

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
                                brandName={currentUser.subscription.name ?? "Capture Pulse"}
                                routes={menuItems}
                                onMouseEnter={handleOnMouseEnter}
                                onMouseLeave={handleOnMouseLeave}
                            />

                            <DashboardLayout>
                                <DashboardNavbar/>
                                <Configurator/>
                                {toDoListButton}
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
