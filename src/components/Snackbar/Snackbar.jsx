import PropTypes from "prop-types";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";

import { useMaterialUIController } from "../../context/materialUIControllerProvider.jsx";
import Box from "../Box/Box.jsx";
import MDSnackbarIconRoot from "./SnackbarIconRoot.js";
import Typography from "../Typography/Typography.jsx";

function Snackbar({ color, icon, title, dateTime, content, close, bgWhite, ...rest }) {
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;

    let titleColor;
    let dateTimeColor;
    let dividerColor;

    if (bgWhite) {
        titleColor = color;
        dateTimeColor = "dark";
        dividerColor = false;
    } else if (color === "light") {
        titleColor = darkMode ? "inherit" : "dark";
        dateTimeColor = darkMode ? "inherit" : "text";
        dividerColor = false;
    } else {
        titleColor = "white";
        dateTimeColor = "white";
        dividerColor = true;
    }

    return (
        <Snackbar
            TransitionComponent={Fade}
            autoHideDuration={5000}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            {...rest}
            action={
                <IconButton size="small" aria-label="close" color="inherit" onClick={close}>
                    <Icon fontSize="small">close</Icon>
                </IconButton>
            }
        >
            <Box
                variant={bgWhite ? "contained" : "gradient"}
                bgColor={bgWhite ? "white" : color}
                minWidth="21.875rem"
                maxWidth="100%"
                shadow="md"
                borderRadius="md"
                p={1}
                sx={{
                    backgroundColor: ({ palette }) =>
                        darkMode ? palette.background.card : palette[color] || palette.white.main,
                }}
            >
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    color="dark"
                    p={1.5}
                >
                    <Box display="flex" alignItems="center" lineHeight={0}>
                        <MDSnackbarIconRoot fontSize="small" ownerState={{ color, bgWhite }}>
                            {icon}
                        </MDSnackbarIconRoot>
                        <Typography
                            variant="button"
                            fontWeight="medium"
                            color={titleColor}
                            textGradient={bgWhite}
                        >
                            {title}
                        </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" lineHeight={0}>
                        <Typography variant="caption" color={dateTimeColor}>
                            {dateTime}
                        </Typography>
                        <Icon
                            sx={{
                                color: ({ palette: { dark, white } }) =>
                                    bgWhite && !darkMode || color === "light" ? dark.main : white.main,
                                fontWeight: ({ typography: { fontWeightBold } }) => fontWeightBold,
                                cursor: "pointer",
                                marginLeft: 2,
                                transform: "translateY(-1px)",
                            }}
                            onClick={close}
                        >
              close
                        </Icon>
                    </Box>
                </Box>
                <Divider sx={{ margin: 0 }} light={dividerColor} />
                <Box
                    p={1.5}
                    sx={{
                        fontSize: ({ typography: { size } }) => size.sm,
                        color: ({ palette: { white, text } }) => {
                            let colorValue = bgWhite || color === "light" ? text.main : white.main;

                            if (darkMode) {
                                colorValue = color === "light" ? "inherit" : white.main;
                            }

                            return colorValue;
                        },
                    }}
                >
                    {content}
                </Box>
            </Box>
        </Snackbar>
    );
}

// Setting default values for the props of Snackbar
Snackbar.defaultProps = {
    bgWhite: false,
    color: "info",
};

// Typechecking props for Snackbar
Snackbar.propTypes = {
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
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    dateTime: PropTypes.string.isRequired,
    content: PropTypes.node.isRequired,
    close: PropTypes.func.isRequired,
    bgWhite: PropTypes.bool,
};

export default Snackbar;
