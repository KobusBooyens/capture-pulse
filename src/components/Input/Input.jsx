import { forwardRef } from "react";

import PropTypes from "prop-types";
import MDInputRoot from "./InputRoot.js";

const Input = forwardRef(({ error, success, disabled, ...rest }, ref) =>
    <MDInputRoot {...rest} ref={ref} ownerState={{ error, success, disabled }} />
);

// Setting default values for the props of MDInput
Input.defaultProps = {
    error: false,
    success: false,
    disabled: false,
};

// Typechecking props for the MDInput
Input.propTypes = {
    error: PropTypes.bool,
    success: PropTypes.bool,
    disabled: PropTypes.bool,
};

export default Input;
