import { useState } from "react";

import PropTypes from "prop-types";

import Fade from "@mui/material/Fade";
import MDAlertRoot from "./AlertRoot.js";
import Box from "../Box/Box.jsx";
import MDAlertCloseIcon from "./AlertCloseIcon.js";

function Alert({ color, dismissible, children, ...rest }) {
    const [alertStatus, setAlertStatus] = useState("mount");

    const handleAlertStatus = () => setAlertStatus("fadeOut");

    const alertTemplate = (mount = true) => 
        <Fade in={mount} timeout={300}>
            <MDAlertRoot ownerState={{ color }} {...rest}>
                <Box display="flex" alignItems="center" color="white">
                    {children}
                </Box>
                {dismissible ? 
                    <MDAlertCloseIcon onClick={mount ? handleAlertStatus : null}>&times;</MDAlertCloseIcon>
                    : null}
            </MDAlertRoot>
        </Fade>
  ;

    switch (true) {
    case alertStatus === "mount":
        return alertTemplate();
    case alertStatus === "fadeOut":
        setTimeout(() => setAlertStatus("unmount"), 400);
        return alertTemplate(false);
    default:
        alertTemplate();
        break;
    }

    return null;
}

Alert.defaultProps = {
    color: "info",
    dismissible: false,
};

Alert.propTypes = {
    color: PropTypes.oneOf([
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "error",
        "light",
        "dark",
    ]),
    dismissible: PropTypes.bool,
    children: PropTypes.node.isRequired,
};

export default Alert;
