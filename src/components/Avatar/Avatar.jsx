import { forwardRef } from "react";

import PropTypes from "prop-types";
import AvatarRoot from "./AvatarRoot.js";

const Avatar = forwardRef(({
    bgColor = "transparent",
    size = "md",
    shadow = "none",
    ...rest }, ref) =>
    <AvatarRoot ref={ref} ownerState={{ shadow, bgColor, size }} {...rest} />
);

Avatar.propTypes = {
    bgColor: PropTypes.oneOf([
        "transparent",
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "error",
        "light",
        "dark",
        "blue",
        "pink"
    ]),
    size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl", "xxl"]),
    shadow: PropTypes.oneOf(["none", "xs", "sm", "md", "lg", "xl", "xxl", "inset"]),
};

export default Avatar;
