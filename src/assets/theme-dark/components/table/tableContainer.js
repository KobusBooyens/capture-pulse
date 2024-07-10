import colors from "../../base/colors.js";
import boxShadows from "../../base/boxShadows.js";
import borders from "../../base/borders.js";
const { background } = colors;
const { md } = boxShadows;
const { borderRadius } = borders;

const tableContainer = {
    styleOverrides: {
        root: {
            backgroundColor: background.card,
            boxShadow: md,
            borderRadius: borderRadius.xl,
        },
    },
};

export default tableContainer;
