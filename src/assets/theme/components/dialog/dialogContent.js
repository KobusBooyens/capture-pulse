import typography from "../../base/typography.js";
import borders from "../../base/borders.js";
import pxToRem from "../../functions/pxToRem.js";
import colors from "../../base/colors.js";

const { size } = typography;
const { text } = colors;
const { borderWidth, borderColor } = borders;

const dialogContent = {
    styleOverrides: {
        root: {
            padding: pxToRem(16),
            fontSize: size.md,
            color: text.main,
        },

        dividers: {
            borderTop: `${borderWidth[1]} solid ${borderColor}`,
            borderBottom: `${borderWidth[1]} solid ${borderColor}`,
        },
    },
};

export default dialogContent;
