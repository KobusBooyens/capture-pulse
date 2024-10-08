import colors from "../../base/colors.js";
import borders from "../../base/borders.js";
import typography from "../../base/typography.js";
import pxToRem from "../../functions/pxToRem.js";

const { light, text, dark } = colors;
const { borderRadius } = borders;
const { size } = typography;

const menuItem = {
    styleOverrides: {
        root: {
            padding: `${pxToRem(4.8)} ${pxToRem(16)}`,
            borderRadius: borderRadius.md,
            fontSize: size.sm,
            color: text.main,
            transition: "background-color 300ms ease, color 300ms ease",

            "&:hover, &:focus, &.Mui-selected, &.Mui-selected:hover, &.Mui-selected:focus": {
                backgroundColor: light.main,
                color: dark.main,
            },
        },
    },
};

export default menuItem;
