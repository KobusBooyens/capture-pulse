import { useRef, useEffect, useState, useMemo } from "react";

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
import gradientChartLine from "../../../../assets/theme/functions/gradientChartLine.js";
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

function GradientLineChart({ icon, title, description, height, chart }) {
    const chartRef = useRef(null);
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const chartElement = chartRef.current;

        if (!chartElement) return;

        const chartDatasets = chart.datasets
            ? chart.datasets.map((dataset) => ({
                ...dataset,
                tension: 0,
                pointRadius: 0,
                borderWidth: 4,
                borderColor: colors[dataset.color]
                    ? colors[dataset.color || "dark"].main
                    : colors.dark.main,
                fill: true,
                maxBarThickness: 6,
                backgroundColor: gradientChartLine(
                    chartElement.ctx,
                    colors[dataset.color] ? colors[dataset.color || "dark"].main : colors.dark.main
                ),
            }))
            : [];

        setChartData(config(chart.labels || [], chartDatasets));
    }, [chart]);

    const { data, options } = useMemo(() => chartData, [chartData]);

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
        <Box height={height}>
            <Line
                ref={chartRef}
                data={{
                    labels: data?.labels || [],
                    datasets: data?.datasets || [],
                }}
                options={options}
                redraw
            />
        </Box>
    </Box>
  ;

    return title || description ? <Card>{renderChart}</Card> : renderChart;
}

// Setting default values for the props of GradientLineChart
GradientLineChart.defaultProps = {
    icon: { color: "info", component: "" },
    title: "",
    description: "",
    height: "19.125rem",
};

// Typechecking props for the GradientLineChart
GradientLineChart.propTypes = {
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

export default GradientLineChart;
