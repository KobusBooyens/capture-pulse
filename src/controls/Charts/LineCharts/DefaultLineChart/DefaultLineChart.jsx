import { useMemo } from "react";

import PropTypes from "prop-types";

import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";

import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

import colors from "../../../../assets/theme/base/colors";
import config from "./config.js";
import Box from "../../../../components/Box/Box.jsx";
import Typography from "../../../../components/Typography/Typography.jsx";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

function DefaultLineChart({ icon, title, description, height, chart }) {
    const chartDatasets = chart.datasets
        ? chart.datasets.map((dataset) => ({
            ...dataset,
            tension: 0,
            pointRadius: 3,
            borderWidth: 4,
            backgroundColor: "transparent",
            fill: true,
            pointBackgroundColor: colors[dataset.color]
                ? colors[dataset.color || "dark"].main
                : colors.dark.main,
            borderColor: colors[dataset.color]
                ? colors[dataset.color || "dark"].main
                : colors.dark.main,
            maxBarThickness: 6,
        }))
        : [];

    const { data, options } = config(chart.labels || [], chartDatasets);

    const renderChart = 
    <Box py={2} pr={2} pl={icon.component ? 1 : 2}>
        {title || description ? 
            <Box display="flex" px={description ? 1 : 0} pt={description ? 1 : 0}>
                {icon.component && 
            <Box
                width="4rem"
                height="4rem"
                bgColor={icon.color || "dark"}
                variant="gradient"
                coloredShadow={icon.color || "dark"}
                borderRadius="xl"
                display="flex"
                justifyContent="center"
                alignItems="center"
                color="white"
                mt={-5}
                mr={2}
            >
                <Icon fontSize="medium">{icon.component}</Icon>
            </Box>
                }
                <Box mt={icon.component ? -2 : 0}>
                    {title && <Typography variant="h6">{title}</Typography>}
                    <Box mb={2}>
                        <Typography component="div" variant="button" color="text">
                            {description}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            : null}
        {useMemo(
            () => 
                <Box height={height}>
                    <Line data={data} options={options} redraw />
                </Box>
            ,
            [chart, height]
        )}
    </Box>
  ;

    return title || description ? <Card>{renderChart}</Card> : renderChart;
}

// Setting default values for the props of DefaultLineChart
DefaultLineChart.defaultProps = {
    icon: { color: "info", component: "" },
    title: "",
    description: "",
    height: "19.125rem",
};

// Typechecking props for the DefaultLineChart
DefaultLineChart.propTypes = {
    icon: PropTypes.shape({
        color: PropTypes.oneOf([
            "primary",
            "secondary",
            "info",
            "success",
            "warning",
            "error",
            "light",
            "dark",
        ]),
        component: PropTypes.node,
    }),
    title: PropTypes.string,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    chart: PropTypes.objectOf(PropTypes.array).isRequired,
};

export default DefaultLineChart;
