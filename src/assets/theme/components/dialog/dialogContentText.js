import typography from "../../base/typography.js";
import colors from "../../base/colors.js";

const { size } = typography;
const { text } = colors;

const dialogContentText = {
    styleOverrides: {
        root: {
            fontSize: size.md,
            color: text.main,
        },
    },
};

export default dialogContentText;
