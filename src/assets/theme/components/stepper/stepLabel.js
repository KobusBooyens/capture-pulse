import typography from "../../base/typography.js";
import colors from "../../base/colors.js";
import pxToRem from "../../functions/pxToRem.js";
import rgba from "../../functions/rgba.js";

const { size, fontWeightRegular } = typography;
const { white } = colors;

const stepLabel = {
    styleOverrides: {
        label: {
            marginTop: `${pxToRem(8)} !important`,
            fontWeight: fontWeightRegular,
            fontSize: size.xs,
            color: "#9fc9ff",
            textTransform: "uppercase",

            "&.Mui-active": {
                fontWeight: `${fontWeightRegular} !important`,
                color: `${rgba(white.main, 0.8)} !important`,
            },

            "&.Mui-completed": {
                fontWeight: `${fontWeightRegular} !important`,
                color: `${rgba(white.main, 0.8)} !important`,
            },
        },
    },
};

export default stepLabel;
