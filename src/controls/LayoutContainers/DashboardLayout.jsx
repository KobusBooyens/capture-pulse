import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import { useUISettingsController, setLayout } from "../../context/UISettingsProvider.jsx";
import Box from "../../components/Box/Box.jsx";

function DashboardLayout({ children }) {
    const [controller, dispatch] = useUISettingsController();
    const { miniSidenav } = controller;
    const { pathname } = useLocation();

    useEffect(() => {
        setLayout(dispatch, "dashboard");
    }, [pathname]);

    return (
        <Box
            sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
                p: 3,
                position: "relative",

                [breakpoints.up("xl")]: {
                    marginLeft: miniSidenav ? pxToRem(120) : pxToRem(274),
                    transition: transitions.create(["margin-left", "margin-right"], {
                        easing: transitions.easing.easeInOut,
                        duration: transitions.duration.standard,
                    }),
                },
            })}
        >
            {children}
        </Box>
    );
}

DashboardLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DashboardLayout;
