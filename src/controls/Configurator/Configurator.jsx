import { useState, useEffect } from "react";
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";

import {
    useUISettingsController,
    setOpenConfigurator,
    setTransparentSidenav,
    setWhiteSidenav,
    setFixedNavbar,
    setSidenavColor,
    setDarkMode,
} from "../../context/UISettingsProvider.jsx";
import ConfiguratorRoot from "./ConfiguratorRoot.js";
import Box from "../../components/Box/Box.jsx";
import Typography from "../../components/Typography/Typography.jsx";
import Button from "../../components/Button/Button.jsx";

function Configurator() {
    const [controller, dispatch] = useUISettingsController();
    const {
        openConfigurator,
        fixedNavbar,
        sidenavColor,
        transparentSidenav,
        whiteSidenav,
        darkMode,
    } = controller;
    const [disabled, setDisabled] = useState(false);
    const sidenavColors = ["primary", "dark", "info", "success", "warning", "error"];

    // Use the useEffect hook to change the button state for the sidenav type based on window size.
    useEffect(() => {
    // A function that sets the disabled state of the buttons for the sidenav type.
        function handleDisabled() {
            return window.innerWidth > 1200 ? setDisabled(false) : setDisabled(true);
        }

        // The event listener that's calling the handleDisabled function when resizing the window.
        window.addEventListener("resize", handleDisabled);

        // Call the handleDisabled function to set the state with the initial value.
        handleDisabled();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleDisabled);
    }, []);

    const handleCloseConfigurator = () => setOpenConfigurator(dispatch, false);
    const handleTransparentSidenav = () => {
        setTransparentSidenav(dispatch, true);
        setWhiteSidenav(dispatch, false);
    };
    const handleWhiteSidenav = () => {
        setWhiteSidenav(dispatch, true);
        setTransparentSidenav(dispatch, false);
    };
    const handleDarkSidenav = () => {
        setWhiteSidenav(dispatch, false);
        setTransparentSidenav(dispatch, false);
    };
    const handleFixedNavbar = () => setFixedNavbar(dispatch, !fixedNavbar);
    const handleDarkMode = () => setDarkMode(dispatch, !darkMode);

    // sidenav type buttons styles
    const sidenavTypeButtonsStyles = ({
        functions: { pxToRem },
        palette: { white, dark, background },
        borders: { borderWidth },
    }) => ({
        height: pxToRem(39),
        background: darkMode ? background.sidenav : white.main,
        color: darkMode ? white.main : dark.main,
        border: `${borderWidth[1]} solid ${darkMode ? white.main : dark.main}`,

        "&:hover, &:focus, &:focus:not(:hover)": {
            background: darkMode ? background.sidenav : white.main,
            color: darkMode ? white.main : dark.main,
            border: `${borderWidth[1]} solid ${darkMode ? white.main : dark.main}`,
        },
    });

    // sidenav type active button styles
    const sidenavTypeActiveButtonStyles = ({
        functions: { pxToRem, linearGradient },
        palette: { white, gradients, background },
    }) => ({
        height: pxToRem(39),
        background: darkMode ? white.main : linearGradient(gradients.dark.main, gradients.dark.state),
        color: darkMode ? background.sidenav : white.main,

        "&:hover, &:focus, &:focus:not(:hover)": {
            background: darkMode ? white.main : linearGradient(gradients.dark.main, gradients.dark.state),
            color: darkMode ? background.sidenav : white.main,
        },
    });

    return (
        <ConfiguratorRoot variant="permanent" ownerState={{ openConfigurator }}>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="baseline"
                pt={4}
                pb={0.5}
                px={3}
            >
                <Box>
                    <Typography variant="h5">Material UI Configurator</Typography>
                    <Typography variant="body2" color="text">
            See our dashboard options.
                    </Typography>
                </Box>

                <Icon
                    sx={({ typography: { size }, palette: { dark, white } }) => ({
                        fontSize: `${size.lg} !important`,
                        color: darkMode ? white.main : dark.main,
                        stroke: "currentColor",
                        strokeWidth: "2px",
                        cursor: "pointer",
                        transform: "translateY(5px)",
                    })}
                    onClick={handleCloseConfigurator}
                >
          close
                </Icon>
            </Box>

            <Divider />

            <Box pt={0.5} pb={3} px={3}>
                <Box>
                    <Typography variant="h6">Sidenav Colors</Typography>

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
                </Box>

                <Box mt={3} lineHeight={1}>
                    <Typography variant="h6">Sidenav Type</Typography>
                    <Typography variant="button" color="text">
            Choose between different sidenav types.
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            mt: 2,
                            mr: 1,
                        }}
                    >
                        <Button
                            color="dark"
                            variant="gradient"
                            onClick={handleDarkSidenav}
                            disabled={disabled}
                            fullWidth
                            sx={
                                !transparentSidenav && !whiteSidenav
                                    ? sidenavTypeActiveButtonStyles
                                    : sidenavTypeButtonsStyles
                            }
                        >
              Dark
                        </Button>
                        <Box sx={{ mx: 1, width: "8rem", minWidth: "8rem" }}>
                            <Button
                                color="dark"
                                variant="gradient"
                                onClick={handleTransparentSidenav}
                                disabled={disabled}
                                fullWidth
                                sx={
                                    transparentSidenav && !whiteSidenav
                                        ? sidenavTypeActiveButtonStyles
                                        : sidenavTypeButtonsStyles
                                }
                            >
                Transparent
                            </Button>
                        </Box>
                        <Button
                            color="dark"
                            variant="gradient"
                            onClick={handleWhiteSidenav}
                            disabled={disabled}
                            fullWidth
                            sx={
                                whiteSidenav && !transparentSidenav
                                    ? sidenavTypeActiveButtonStyles
                                    : sidenavTypeButtonsStyles
                            }
                        >
              White
                        </Button>
                    </Box>
                </Box>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mt={3}
                    lineHeight={1}
                >
                    <Typography variant="h6">Navbar Fixed</Typography>

                    <Switch checked={fixedNavbar} onChange={handleFixedNavbar} />
                </Box>
                <Divider />
                <Box display="flex" justifyContent="space-between" alignItems="center" lineHeight={1}>
                    <Typography variant="h6">Light / Dark</Typography>

                    <Switch checked={darkMode} onChange={handleDarkMode} />
                </Box>
                <Divider />
            </Box>
        </ConfiguratorRoot>
    );
}

export default Configurator;
