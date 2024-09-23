import { useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

import { useUISettingsController,
    setMiniSidenav,
    setTransparentSidenav,
    setWhiteSidenav,
} from "../../context/UISettingsProvider.jsx";
import SidenavCollapse from "./SidenavCollapse.jsx";
import SidenavRoot from "./SidenavRoot.jsx";
import Box from "../../components/Box/Box.jsx";
import Typography from "../../components/Typography/Typography.jsx";

import sidenavLogoLabel from "./styles/sidenav.js";

function Sidenav({ color, brand, brandName, routes, ...rest }) {
    const [controller, dispatch] = useUISettingsController();
    const { miniSidenav, transparentSidenav, whiteSidenav, darkMode } = controller;
    const location = useLocation();
    const collapseName = location.pathname.replace("/", "");
    const [activeMenuKey, setActiveMenuKey] = useState("");
    let textColor = "white";

    if (transparentSidenav || whiteSidenav && !darkMode) {
        textColor = "dark";
    } else if (whiteSidenav && darkMode) {
        textColor = "inherit";
    }

    const closeSidenav = () => setMiniSidenav(dispatch, true);

    useEffect(() => {
        function handleMiniSidenav() {
            setMiniSidenav(dispatch, window.innerWidth < 1200);
            setTransparentSidenav(dispatch, window.innerWidth < 1200 ? false : transparentSidenav);
            setWhiteSidenav(dispatch, window.innerWidth < 1200 ? false : whiteSidenav);
        }

        window.addEventListener("resize", handleMiniSidenav);
        handleMiniSidenav();

        return () => window.removeEventListener("resize", handleMiniSidenav);
    }, [dispatch, location]);

    const renderRoutes = routes.map(({ type, name, icon, title, key, route, subMenuItems }) => {
        let returnValue;

        if (type === "collapse") {
            returnValue =
                <NavLink key={key} to={route}>
                    <SidenavCollapse name={name}
                        icon={icon}
                        active={key === collapseName}
                        subMenuItems={subMenuItems}
                        mainMenuKey={key}
                        setActiveMenu={setActiveMenuKey}
                        activeMenuKey={activeMenuKey}
                    />
                </NavLink>
            ;
        } else if (type === "title") {
            returnValue = 
        <Typography
            key={key}
            color={textColor}
            display="block"
            variant="caption"
            fontWeight="bold"
            textTransform="uppercase"
            pl={3}
            mt={2}
            mb={1}
            ml={1}
        >
            {title}
        </Typography>
            ;
        } else if (type === "divider") {
            returnValue = 
        <Divider
            key={key}
            light={
                !darkMode && !whiteSidenav && !transparentSidenav ||
            darkMode && !transparentSidenav && whiteSidenav
            }
        />
            ;
        }

        return returnValue;
    });

    return (
        <SidenavRoot
            {...rest}
            variant="permanent"
            ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}
        >
            <Box pt={3} pb={1} px={4} textAlign="center">
                <Box
                    display={{ xs: "block", xl: "none" }}
                    position="absolute"
                    top={0}
                    right={0}
                    p={1.625}
                    onClick={closeSidenav}
                    sx={{ cursor: "pointer" }}
                >
                    <Typography variant="h6" color="secondary">
                        <Icon sx={{ fontWeight: "bold" }}>close</Icon>
                    </Typography>
                </Box>
                <Box component={NavLink} to="/" display="flex" alignItems="center" gap={1}>
                    {brand && <Box component="img" src={brand} alt="Brand" width="2rem" />}
                    <Box
                        // width={!brandName && "100%"}
                        sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
                    >
                        <Typography component="h6" variant="button" fontWeight="medium" color={textColor}>
                            {brandName}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Divider
                light={ !darkMode && !whiteSidenav && !transparentSidenav ||
                  darkMode && !transparentSidenav && whiteSidenav}
            />
            <List>{renderRoutes}</List>
        </SidenavRoot>
    );
}

Sidenav.defaultProps = {
    color: "info",
    brand: "",
};

Sidenav.propTypes = {
    color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
    brand: PropTypes.string,
    brandName: PropTypes.string.isRequired,
    routes: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Sidenav;
