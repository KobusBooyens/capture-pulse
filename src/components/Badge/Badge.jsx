import { forwardRef } from "react";

import PropTypes from "prop-types";
import BadgeRoot from "./BadgeRoot.js";

const Badge = forwardRef(
    ({ color, variant, size, circular, indicator, border, container, children, ...rest }, ref) => 
        <BadgeRoot
            {...rest}
            ownerState={{ color, variant, size, circular, indicator, border, container, children }}
            ref={ref}
            color="default"
        >
            {children}
        </BadgeRoot>
);

Badge.defaultProps = {
    color: "info",
    variant: "gradient",
    size: "sm",
    circular: false,
    indicator: false,
    border: false,
    children: false,
    container: false,
};

Badge.propTypes = {
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
    variant: PropTypes.oneOf(["gradient", "contained", "dot"]),
    size: PropTypes.oneOf(["xs", "sm", "md", "lg"]),
    circular: PropTypes.bool,
    indicator: PropTypes.bool,
    border: PropTypes.bool,
    children: PropTypes.node,
    container: PropTypes.bool,
};

export default Badge;
