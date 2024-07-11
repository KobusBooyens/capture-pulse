import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Sidenav from "./controls/Sidenav/Sidenav.jsx";
import routes from "./routes.jsx";
import {
    setMiniSidenav,
    useMaterialUIController,
} from "./context/materialUIControllerProvider.jsx";
import { useEffect, useState } from "react";

import brandWhite from "./assets/images/logo.png";
import brandDark from "./assets/images/logo-dark.png";
import themeDark from "./assets/theme-dark/index.js";
import theme from "./assets/theme/index.js";

function App() {
    const [controller, dispatch] = useMaterialUIController();
    const {
        miniSidenav,
        sidenavColor,
        transparentSidenav,
        whiteSidenav,
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

    const getRoutes = (allRoutes) =>
        allRoutes.map((route) => {
            if (route.collapse) {
                return getRoutes(route.collapse);
            }

            if (route.route) {
                return <Route exact path={route.route} element={route.component} key={route.key} />;
            }

            return null;
        });

    const useDarkBrand = transparentSidenav && !darkMode || whiteSidenav;
    const brand = useDarkBrand ? brandDark : brandWhite;
    return (
        <>
            <ThemeProvider theme={darkMode ? themeDark : theme}>
                <CssBaseline/>
                <Sidenav
                    color={sidenavColor}
                    brand={brand}
                    brandName={"Capture Pulse"}
                    routes={routes}
                    onMouseEnter={handleOnMouseEnter}
                    onMouseLeave={handleOnMouseLeave}
                />
                <Routes>
                    {getRoutes(routes)}
                    <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
            </ThemeProvider>
        </>
    );
}

export default App;
