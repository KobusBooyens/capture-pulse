import colors from "../base/colors.js";
import boxShadows from "../base/boxShadows.js";
import borders from "../base/borders.js";
import pxToRem from "../functions/pxToRem.js";

const { transparent } = colors;
const { md } = boxShadows;
const { borderRadius } = borders;

const popover = {
    styleOverrides: {
        paper: {
            backgroundColor: transparent.main,
            boxShadow: md,
            padding: pxToRem(8),
            borderRadius: borderRadius.md,
        },
    },
};

export default popover;
