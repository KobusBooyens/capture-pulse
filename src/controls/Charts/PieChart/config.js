import colors from "../../../assets/theme/base/colors";

const { gradients, dark } = colors;

function configs(labels, datasets, options) {
    const backgroundColors = [];
    console.log("labels", labels);
    console.log("backgroundColors", datasets.backgroundColors);
    if (datasets.backgroundColors) {
        datasets.backgroundColors.forEach((color) =>
            gradients[color]
                ? backgroundColors.push(gradients[color].state)
                : backgroundColors.push(dark.main)
        );
    } else {
        backgroundColors.push(dark.main);
    }

    return {
        data: {
            labels,
            datasets: [
                {
                    label: datasets.label,
                    weight: 9,
                    cutout: 0,
                    tension: 0.9,
                    pointRadius: 2,
                    borderWidth: 2,
                    backgroundColor: backgroundColors,
                    fill: false,
                    data: datasets.data,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "top",
                    display: true,
                }
            },
            interaction: {
                intersect: false,
                mode: "index",
            },
            hoverOffset: 4
        },
    };
}

export default configs;
