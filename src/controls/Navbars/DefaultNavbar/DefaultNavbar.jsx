import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Container from "@mui/material/Container";
import Icon from "@mui/material/Icon";

import breakpoints from "../../../assets/theme/base/breakpoints";

import { useMaterialUIController } from "../../../context/materialUIControllerProvider.jsx";
import Box from "../../../components/Box/Box.jsx";
import Typography from "../../../components/Typography/Typography.jsx";
import DefaultNavbarLink from "./DefaultNavbarLink.jsx";
import Button from "../../../components/Button/Button.jsx";
import DefaultNavbarMobile from "./DefaultNavbarMobile.jsx";

function DefaultNavbar({ transparent, light, action }) {
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;

    const [mobileNavbar, setMobileNavbar] = useState(false);
    const [mobileView, setMobileView] = useState(false);

    const openMobileNavbar = ({ currentTarget }) => setMobileNavbar(currentTarget.parentNode);
    const closeMobileNavbar = () => setMobileNavbar(false);

    useEffect(() => {
    // A function that sets the display state for the DefaultNavbarMobile.
        function displayMobileNavbar() {
            if (window.innerWidth < breakpoints.values.lg) {
                setMobileView(true);
                setMobileNavbar(false);
            } else {
                setMobileView(false);
                setMobileNavbar(false);
            }
        }

        /** 
     The event listener that's calling the displayMobileNavbar function when 
     resizing the window.
    */
        window.addEventListener("resize", displayMobileNavbar);

        // Call the displayMobileNavbar function to set the state with the initial value.
        displayMobileNavbar();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", displayMobileNavbar);
    }, []);

    return (
        <Container>
            <Box
                py={1}
                px={{ xs: 4, sm: transparent ? 2 : 3, lg: transparent ? 0 : 2 }}
                my={3}
                mx={3}
                width="calc(100% - 48px)"
                borderRadius="lg"
                shadow={transparent ? "none" : "md"}
                color={light ? "white" : "dark"}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                position="absolute"
                left={0}
                zIndex={3}
                sx={({
                    palette: { transparent: transparentColor, white, background },
                    functions: { rgba },
                }) => ({
                    backgroundColor: transparent
                        ? transparentColor.main
                        : rgba(darkMode ? background.sidenav : white.main, 0.8),
                    backdropFilter: transparent ? "none" : "saturate(200%) blur(30px)",
                })}
            >
                <Box
                    component={Link}
                    to="/"
                    py={transparent ? 1.5 : 0.75}
                    lineHeight={1}
                    pl={{ xs: 0, lg: 1 }}
                >
                    <Typography variant="button" fontWeight="bold" color={light ? "white" : "dark"}>
            Material Dashboard 2
                    </Typography>
                </Box>
                <Box color="inherit" display={{ xs: "none", lg: "flex" }} m={0} p={0}>
                    <DefaultNavbarLink icon="donut_large" name="dashboard" route="/dashboard" light={light} />
                    <DefaultNavbarLink icon="person" name="profile" route="/profile" light={light} />
                    <DefaultNavbarLink
                        icon="account_circle"
                        name="sign up"
                        route="/authentication/sign-up"
                        light={light}
                    />
                    <DefaultNavbarLink
                        icon="key"
                        name="sign in"
                        route="/authentication/sign-in"
                        light={light}
                    />
                </Box>
                {action &&
          (action.type === "internal" ? 
              <Box display={{ xs: "none", lg: "inline-block" }}>
                  <Button
                      component={Link}
                      to={action.route}
                      variant="gradient"
                      color={action.color ? action.color : "info"}
                      size="small"
                  >
                      {action.label}
                  </Button>
              </Box>
              : 
              <Box display={{ xs: "none", lg: "inline-block" }}>
                  <Button
                      component="a"
                      href={action.route}
                      target="_blank"
                      rel="noreferrer"
                      variant="gradient"
                      color={action.color ? action.color : "info"}
                      size="small"
                      sx={{ mt: -0.3 }}
                  >
                      {action.label}
                  </Button>
              </Box>
          )}
                <Box
                    display={{ xs: "inline-block", lg: "none" }}
                    lineHeight={0}
                    py={1.5}
                    pl={1.5}
                    color="inherit"
                    sx={{ cursor: "pointer" }}
                    onClick={openMobileNavbar}
                >
                    <Icon fontSize="default">{mobileNavbar ? "close" : "menu"}</Icon>
                </Box>
            </Box>
            {mobileView && <DefaultNavbarMobile open={mobileNavbar} close={closeMobileNavbar} />}
        </Container>
    );
}

DefaultNavbar.defaultProps = {
    transparent: false,
    light: false,
    action: false,
};

DefaultNavbar.propTypes = {
    transparent: PropTypes.bool,
    light: PropTypes.bool,
    action: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.shape({
            type: PropTypes.oneOf(["external", "internal"]).isRequired,
            route: PropTypes.string.isRequired,
            color: PropTypes.oneOf([
                "primary",
                "secondary",
                "info",
                "success",
                "warning",
                "error",
                "dark",
                "light",
            ]),
            label: PropTypes.string.isRequired,
        }),
    ]),
};

export default DefaultNavbar;
