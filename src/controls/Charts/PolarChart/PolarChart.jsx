import { useMemo } from "react";
import PropTypes from "prop-types";

import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from "chart.js";
import { PolarArea } from "react-chartjs-2";

import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import config from "./config.js";
import Box from "../../../components/Box/Box.jsx";
import Typography from "../../../components/Typography/Typography.jsx";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

function PolarChart({ icon, title, description, chart, height }) {
    const { data, options } = config(chart.labels || [], chart.datasets || {});

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
                <Box p={4} height={height}>
                    <PolarArea data={data} options={options} redraw />
                </Box>
            ,
            [chart]
        )}
    </Box>
  ;

    return title || description ? <Card>{renderChart}</Card> : renderChart;
}

// Setting default values for the props of PolarChart
PolarChart.defaultProps = {
    icon: { color: "info", component: "" },
    title: "",
    description: "",
};

// Typechecking props for the PolarChart
PolarChart.propTypes = {
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
    chart: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])).isRequired,
};

export default PolarChart;
