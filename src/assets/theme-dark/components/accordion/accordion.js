import borders from "../../base/borders.js";
import boxShadows from "../../base/boxShadows.js";

import pxToRem from "../../functions/pxToRem.js";
import typography from "../../base/typography.js";
const { size, fontWeightRegular } = typography;

const { borderRadius } = borders;
const { colored } = boxShadows;

const accordion = {
    styleOverrides: {
        root: {
            background: "inherit",
            borderRadius: borderRadius.xl,
            boxShadow: colored.info,

            color: "#9fc9ff",
            fontWeight: fontWeightRegular,
            fontSize: size.md,
            // textTransform: "uppercase",
            marginBottom: `${pxToRem(16)}`,
            "&:before": {
                display: "none",
            },
        },
    },
};

export default accordion;