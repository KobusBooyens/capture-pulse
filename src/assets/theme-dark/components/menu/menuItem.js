import colors from "../../base/colors.js";
import borders from "../../base/borders.js";
import typography from "../../base/typography.js";
import pxToRem from "../../functions/pxToRem.js";
import rgba from "../../functions/rgba.js";
const { dark, white } = colors;
const { borderRadius } = borders;
const { size } = typography;

const menuItem = {
    styleOverrides: {
        root: {
            minWidth: pxToRem(160),
            minHeight: "unset",
            padding: `${pxToRem(4.8)} ${pxToRem(16)}`,
            borderRadius: borderRadius.md,
            fontSize: size.sm,
            color: rgba(white.main, 0.8),
            transition: "background-color 300ms ease, color 300ms ease",

            "&:hover, &:focus, &.Mui-selected, &.Mui-selected:hover, &.Mui-selected:focus": {
                backgroundColor: dark.main,
                color: white.main,
            },
        },
    },
};

export default menuItem;
