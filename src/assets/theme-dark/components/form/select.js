import colors from "../../base/colors.js";
import typography from "../../base/typography.js";
import borders from "../../base/borders.js";
import rgba from "../../functions/rgba.js";

const { info, inputBorderColor, dark, grey, white } = colors;
const { size } = typography;
const { borderWidth } = borders;

const select = {
    styleOverrides: {
        root: {
            fontSize: size.sm,
            color: dark.main,
            "& .MuiSelect-select": {
                color: white.main,
                "&:focus": {
                    backgroundColor: rgba(inputBorderColor, 0.1),
                },
                "&:hover:not(.Mui-disabled):before": {
                    borderBottom: `${borderWidth[1]} solid ${rgba(inputBorderColor, 0.6)}`,
                },
                "&:before": {
                    borderColor: rgba(inputBorderColor, 0.6),
                },
                "&:after": {
                    borderColor: info.main,
                },
                "& .MuiSelect-icon": {
                    color: grey[100],
                },
            },
            "& .MuiSelect-iconOpen": {
                color: info.main,
            },
        },
        selectMenu: {
            backgroundColor: dark.main,
            color: white.main,
        },
        icon: {
            color: grey[100],
        },
        iconOpen: {
            color: info.main,
        },
    },
};

export default select;
