import colors from "../../base/colors.js";
import typography from "../../base/typography.js";
import pxToRem from "../../functions/pxToRem.js";

const { dark } = colors;
const { size, fontWeightBold } = typography;

const formControlLabel = {
    styleOverrides: {
        root: {
            display: "block",
            minHeight: pxToRem(24),
            marginBottom: pxToRem(2),
        },

        label: {
            display: "inline-block",
            fontSize: size.sm,
            fontWeight: fontWeightBold,
            color: dark.main,
            lineHeight: 1,
            transform: `translateY(${pxToRem(1)})`,
            marginLeft: pxToRem(4),

            "&.Mui-disabled": {
                color: dark.main,
            },
        },
    },
};

export default formControlLabel;
