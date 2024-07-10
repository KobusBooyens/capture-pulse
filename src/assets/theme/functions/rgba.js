import hexToRgb from "./hexToRgb.js";

function rgba(color, opacity) {
    return `rgba(${hexToRgb(color)}, ${opacity})`;
}

export default rgba;
