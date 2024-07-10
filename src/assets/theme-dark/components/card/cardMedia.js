import borders from "../../base/borders.js";
import pxToRem from "../../functions/pxToRem.js";

const { borderRadius } = borders;

const cardMedia = {
    styleOverrides: {
        root: {
            borderRadius: borderRadius.xl,
            margin: `${pxToRem(16)} ${pxToRem(16)} 0`,
        },

        media: {
            width: "auto",
        },
    },
};

export default cardMedia;
