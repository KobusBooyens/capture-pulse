import colors from "../../base/colors.js";
import borders from "../../base/borders.js";
import boxShadows from "../../base/boxShadows.js";
import linearGradient from "../../functions/linearGradient.js";
import pxToRem from "../../functions/pxToRem.js";

const { transparent, gradients } = colors;
const { borderRadius } = borders;
const { colored } = boxShadows;

const stepper = {
    styleOverrides: {
        root: {
            background: linearGradient(gradients.info.state, gradients.info.main),
            //  background: linearGradient( "#125688", "#125688BF"),
            padding: `${pxToRem(24)} 0 ${pxToRem(16)}`,
            borderRadius: borderRadius.lg,
            boxShadow: colored.info,

            "&.MuiPaper-root": {
                backgroundColor: transparent.main,
            },
        },
    },
};

export default stepper;
