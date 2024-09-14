import { useState } from "react";

import PropTypes from "prop-types";

import Fade from "@mui/material/Fade";
import AlertRoot from "./AlertRoot.js";
import Box from "../Box/Box.jsx";
import MDAlertCloseIcon from "./AlertCloseIcon.js";

function Alert({ color, dismissible, onDismiss, children, ...rest }) {
    const [alertStatus, setAlertStatus] = useState("mount");

    const handleAlertStatus = () => {
        onDismiss();
        setAlertStatus("fadeOut");
    };

    const alertTemplate = (mount = true) => 
        <Fade in={mount} timeout={300}>
            <AlertRoot ownerState={{ color }} {...rest}>
                <Box display="flex" alignItems="center" color="white">
                    {children}
                </Box>
                {dismissible ?
                    <MDAlertCloseIcon onClick={mount ? handleAlertStatus : null}>&times;</MDAlertCloseIcon>
                    : null}
            </AlertRoot>
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
    onDismiss: PropTypes.func,
    children: PropTypes.node.isRequired,
};

export default Alert;
