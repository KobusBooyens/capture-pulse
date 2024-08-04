
import colors from "../../base/colors.js";
import pxToRem from "../../functions/pxToRem.js";
const { grey } = colors;

const accordionDetails = {
    styleOverrides: {
        root: {
            padding: `${pxToRem(16)}`,
            backgroundColor: "inherit",
        },
    },
};

export default accordionDetails;