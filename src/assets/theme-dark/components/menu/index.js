import boxShadows from "../../base/boxShadows.js";
import typography from "../../base/typography.js";
import colors from "../../base/colors.js";
import borders from "../../base/borders.js";
import pxToRem from "../../functions/pxToRem.js";
const { md } = boxShadows;
const { size } = typography;
const { text, background } = colors;
const { borderRadius } = borders;

const menu = {
    defaultProps: {
        disableAutoFocusItem: true,
    },

    styleOverrides: {
        paper: {
            minWidth: pxToRem(160),
            boxShadow: md,
            padding: `${pxToRem(16)} ${pxToRem(8)}`,
            fontSize: size.sm,
            color: text.main,
            textAlign: "left",
            backgroundColor: `${background.card} !important`,
            borderRadius: borderRadius.md,
        },
    },
};

export default menu;
