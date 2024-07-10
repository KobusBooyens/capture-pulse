import { forwardRef } from "react";
import PropTypes from "prop-types";
import Typography from "../Typography/Typography.jsx";
import MDProgressRoot from "./ProgressRoot.js";

const Progress = forwardRef(({ variant, color, value, label, ...rest }, ref) =>
    <>
        {label && 
      <Typography variant="button" fontWeight="medium" color="text">
          {value}%
      </Typography>
        }
        <MDProgressRoot
            {...rest}
            ref={ref}
            variant="determinate"
            value={value}
            ownerState={{ color, value, variant }}
        />
    </>
);

// Setting default values for the props of MDProgress
Progress.defaultProps = {
    variant: "contained",
    color: "info",
    value: 0,
    label: false,
};

// Typechecking props for the MDProgress
Progress.propTypes = {
    variant: PropTypes.oneOf(["contained", "gradient"]),
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
    value: PropTypes.number,
    label: PropTypes.bool,
};

export default Progress;
