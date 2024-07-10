import boxShadows from "../../base/boxShadows.js";
import typography from "../../base/typography.js";
import colors from "../../base/colors.js";
import borders from "../../base/borders.js";
import pxToRem from "../../functions/pxToRem.js";

const { lg } = boxShadows;
const { size } = typography;
const { text, white } = colors;
const { borderRadius } = borders;

const menu = {
    defaultProps: {
        disableAutoFocusItem: true,
    },

    styleOverrides: {
        paper: {
            minWidth: pxToRem(160),
            boxShadow: lg,
            padding: `${pxToRem(16)} ${pxToRem(8)}`,
            fontSize: size.sm,
            color: text.main,
            textAlign: "left",
            backgroundColor: `${white.main} !important`,
            borderRadius: borderRadius.md,
        },
    },
};

export default menu;
