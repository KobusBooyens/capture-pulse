import colors from "../../base/colors.js";
import borders from "../../base/borders.js";
import boxShadows from "../../base/boxShadows.js";
import rgba from "../../functions/rgba.js";
const { black, background } = colors;
const { borderWidth, borderRadius } = borders;
const { md } = boxShadows;

const card = {
    styleOverrides: {
        root: {
            display: "flex",
            flexDirection: "column",
            position: "relative",
            minWidth: 0,
            wordWrap: "break-word",
            backgroundImage: "none",
            backgroundColor: background.card,
            backgroundClip: "border-box",
            border: `${borderWidth[0]} solid ${rgba(black.main, 0.125)}`,
            borderRadius: borderRadius.xl,
            boxShadow: md,
            overflow: "visible",
        },
    },
};

export default card;
