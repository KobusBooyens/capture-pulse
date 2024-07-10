import typography from "../../base/typography.js";
import colors from "../../base/colors.js";
import borders from "../../base/borders.js";
import pxToRem from "../../functions/pxToRem.js";
import rgba from "../../functions/rgba.js";
const { size } = typography;
const { white } = colors;
const { borderWidth, borderColor } = borders;

const dialogContent = {
    styleOverrides: {
        root: {
            padding: pxToRem(16),
            fontSize: size.md,
            color: rgba(white.main, 0.8),
        },

        dividers: {
            borderTop: `${borderWidth[1]} solid ${rgba(borderColor, 0.6)}`,
            borderBottom: `${borderWidth[1]} solid ${rgba(borderColor, 0.6)}`,
        },
    },
};

export default dialogContent;
