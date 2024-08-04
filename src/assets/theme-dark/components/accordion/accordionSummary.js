import colors from "../../base/colors.js";
import pxToRem from "../../functions/pxToRem.js";
const { grey } = colors;

const accordionSummary = {
    styleOverrides: {
        root: {
            backgroundColor: "inherit",
            borderRadius: `${pxToRem(8)}`,
            marginBottom: `${pxToRem(4)}`,
            minHeight: `${pxToRem(48)}`,
            "&.Mui-expanded": {
                minHeight: `${pxToRem(48)}`,
            },
        },
        content: {
            margin: 0,
            "&.Mui-expanded": {
                margin: 0,
            },
        },
    },
};

export default accordionSummary;