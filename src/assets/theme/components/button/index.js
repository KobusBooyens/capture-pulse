import contained from "./contained.js";
import outlined from "./outlined.js";
import buttonText from "./text.js";
import root from "./root.js";

const button = {
    defaultProps: {
        disableRipple: false,
    },
    styleOverrides: {
        root: { ...root },
        contained: { ...contained.base },
        containedSizeSmall: { ...contained.small },
        containedSizeLarge: { ...contained.large },
        containedPrimary: { ...contained.primary },
        containedSecondary: { ...contained.secondary },
        outlined: { ...outlined.base },
        outlinedSizeSmall: { ...outlined.small },
        outlinedSizeLarge: { ...outlined.large },
        outlinedPrimary: { ...outlined.primary },
        outlinedSecondary: { ...outlined.secondary },
        text: { ...buttonText.base },
        textSizeSmall: { ...buttonText.small },
        textSizeLarge: { ...buttonText.large },
        textPrimary: { ...buttonText.primary },
        textSecondary: { ...buttonText.secondary },
    },
};

export default button;
