import borders from "../../base/borders.js";
import colors from "../../base/colors.js";
import pxToRem from "../../functions/pxToRem.js";

const { borderWidth } = borders;
const { light } = colors;

const tableCell = {
    styleOverrides: {
        root: {
            padding: `${pxToRem(12)} ${pxToRem(16)}`,
            borderBottom: `${borderWidth[1]} solid ${light.main}`,
        },
    },
};

export default tableCell;
