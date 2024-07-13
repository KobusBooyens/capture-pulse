import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

import {
    navbar,
    navbarContainer,
    navbarRow,
    navbarIconButton,
    navbarMobileMenu,
} from "./styles.js";

import {
    useMaterialUIController,
    setMiniSidenav,
    setDarkMode,
    setSidenavColor,
    setTransparentNavbar
} from "../../../context/materialUIControllerProvider.jsx";

import NotificationItem from "../../Items/NotificationItem/NotificationItem.jsx";

import Box from "../../../components/Box/Box.jsx";
import Breadcrumbs from "../../Breadcrumbs/Breadcrumbs.jsx";

function DashboardNavbar({ absolute, light, isMini }) {
    const [controller, dispatch] = useMaterialUIController();
    const { miniSidenav, transparentNavbar, darkMode, sidenavColor, fixedNavbar } = controller;
    const [openMenu, setOpenMenu] = useState(false);
    const [openPersonalizeMenu, setOpenPersonalizeMenu] = useState(false);
    const route = useLocation().pathname.split("/").slice(1);

    const sidenavColors = ["primary", "dark", "info", "success", "warning", "error"];

    const navigation = useNavigate();
    const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
    const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
    const handleCloseMenu = () => setOpenMenu(false);
    const handleOpenPersonalizeMenu = (event) => setOpenPersonalizeMenu(event.currentTarget);
    const handleClosePersonalizeMenu = () => setOpenPersonalizeMenu(false);
    const handleSignOut = () => navigation("/authentication/sign-in");

    useEffect(() => {
    // A function that sets the transparent state of the navbar.
        function handleTransparentNavbar() {
            setTransparentNavbar(dispatch, fixedNavbar && window.scrollY === 0 || !fixedNavbar);
        }

        window.addEventListener("scroll", handleTransparentNavbar);

        handleTransparentNavbar();

        return () => window.removeEventListener("scroll", handleTransparentNavbar);
    }, [dispatch]);

    const renderMenu = () => 
        <Menu
            anchorEl={openMenu}
            anchorReference={null}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
            }}
            open={Boolean(openMenu)}
            onClose={handleCloseMenu}
            sx={{ mt: 2 }}
        >
            <NotificationItem icon={<Icon>logout</Icon>} title="Sign-out" onClick={handleSignOut} />
            <NotificationItem
                icon={<Icon>{darkMode ? "light_mode" : "dark_mode"}</Icon>}
                title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                onClick={handleDarkMode}
            />

            <NotificationItem
                icon={<Icon>palette</Icon>}
                title="Personalize"
                onClick={handleOpenPersonalizeMenu} />
        </Menu>
  ;

    const renderPaletteMenu = () =>
        <Menu anchorEl={openPersonalizeMenu}
            anchorReference={null}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
            }}
            open={Boolean(openPersonalizeMenu)}
            onClose={handleClosePersonalizeMenu}
            sx={{ mt: 2 }}>
            <NotificationItem title={"Navbar"} disableRipple >
                <Box mb={0.5}>
                    {sidenavColors.map((color) =>
                        <IconButton
                            key={color}
                            sx={({
                                borders: { borderWidth },
                                palette: { white, dark, background },
                                transitions,
                            }) => ({
                                width: "24px",
                                height: "24px",
                                padding: 0,
                                border: `${borderWidth[1]} solid ${darkMode ? background.sidenav : white.main}`,
                                borderColor: () => {
                                    let borderColorValue = sidenavColor === color && dark.main;

                                    if (darkMode && sidenavColor === color) {
                                        borderColorValue = white.main;
                                    }

                                    return borderColorValue;
                                },
                                transition: transitions.create("border-color", {
                                    easing: transitions.easing.sharp,
                                    duration: transitions.duration.shorter,
                                }),
                                backgroundImage: ({ functions: { linearGradient }, palette: { gradients } }) =>
                                    linearGradient(gradients[color].main, gradients[color].state),

                                "&:not(:last-child)": {
                                    mr: 1,
                                },

                                "&:hover, &:focus, &:active": {
                                    borderColor: darkMode ? white.main : dark.main,
                                },
                            })}
                            onClick={() => setSidenavColor(dispatch, color)}
                        />
                    )}
                </Box>
            </NotificationItem>
        </Menu>;

    const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
        color: () => {
            let colorValue = light || darkMode ? white.main : dark.main;

            if (transparentNavbar && !light) {
                colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
            }

            return colorValue;
        },
    });

    const handleDarkMode = () => setDarkMode(dispatch, !darkMode);

    return (
        <AppBar
            position={"sticky"}
            color="inherit"
            sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
        >
            <Toolbar sx={(theme) => navbarContainer(theme)}>
                <Box color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
                    <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
                </Box>
                {isMini ? null : 
                    <Box sx={(theme) => navbarRow(theme, { isMini })}>
                        <Box color={light ? "white" : "inherit"}>
                            <IconButton
                                size="small"
                                disableRipple
                                color="inherit"
                                sx={navbarIconButton}
                                aria-controls="notification-menu"
                                aria-haspopup="true"
                                variant="contained"
                                onClick={handleOpenMenu}
                            >
                                <Icon sx={iconsStyle}>account_circle</Icon>
                            </IconButton>
                            {/*<Link to="/authentication/sign-in/basic">*/}
                            {/*    <IconButton sx={navbarIconButton} size="small" disableRipple>*/}
                            {/*        <Icon sx={iconsStyle}>account_circle</Icon>*/}
                            {/*    </IconButton>*/}
                            {/*</Link>*/}
                            <IconButton
                                size="small"
                                disableRipple
                                color="inherit"
                                sx={navbarMobileMenu}
                                onClick={handleMiniSidenav}
                            >
                                <Icon sx={iconsStyle} fontSize="medium">
                                    {miniSidenav ? "menu_open" : "menu"}
                                </Icon>
                            </IconButton>

                            {renderMenu()}
                            {renderPaletteMenu()}
                        </Box>
                    </Box>
                }
            </Toolbar>
        </AppBar>
    );
}

DashboardNavbar.defaultProps = {
    absolute: false,
    light: false,
    isMini: false,
};

DashboardNavbar.propTypes = {
    absolute: PropTypes.bool,
    light: PropTypes.bool,
    isMini: PropTypes.bool,
};

export default DashboardNavbar;
