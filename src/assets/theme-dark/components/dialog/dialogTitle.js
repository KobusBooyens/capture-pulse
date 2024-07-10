import typography from "../../base/typography.js";
import pxToRem from "../../functions/pxToRem.js";

const { size } = typography;

const dialogTitle = {
    styleOverrides: {
        root: {
            padding: pxToRem(16),
            fontSize: size.xl,
        },
    },
};

export default dialogTitle;
