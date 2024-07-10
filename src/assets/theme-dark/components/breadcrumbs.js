
import typography from "../base/typography.js";
import colors from "../base/colors.js";

const { grey } = colors;
const { size } = typography;

const breadcrumbs = {
    styleOverrides: {
        li: {
            lineHeight: 0,
        },

        separator: {
            fontSize: size.sm,
            color: grey[600],
        },
    },
};

export default breadcrumbs;
