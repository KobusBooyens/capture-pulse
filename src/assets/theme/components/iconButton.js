import colors from "../base/colors.js";

const { transparent } = colors;

const iconButton = {
    styleOverrides: {
        root: {
            "&:hover": {
                backgroundColor: transparent.main,
            },
        },
    },
};

export default iconButton;
