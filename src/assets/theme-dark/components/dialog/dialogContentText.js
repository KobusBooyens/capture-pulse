import typography from "../../base/typography.js";
import colors from "../../base/colors.js";
import rgba from "../../functions/rgba.js";

const { size } = typography;
const { white } = colors;

const dialogContentText = {
    styleOverrides: {
        root: {
            fontSize: size.md,
            color: rgba(white.main, 0.8),
        },
    },
};

export default dialogContentText;
