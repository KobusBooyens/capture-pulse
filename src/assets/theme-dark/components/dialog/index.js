import borders from "../../base/borders.js";
import boxShadows from "../../base/boxShadows.js";

const { borderRadius } = borders;
const { xxl } = boxShadows;

const dialog = {
    styleOverrides: {
        paper: {
            borderRadius: borderRadius.lg,
            boxShadow: xxl,
        },

        paperFullScreen: {
            borderRadius: 0,
        },
    },
};

export default dialog;
