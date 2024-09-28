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
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import Box from "../../../../components/Box/Box.jsx";
import config from "./config.js";
import Typography from "../../../../components/Typography/Typography.jsx";
import { CircularProgress } from "@mui/material";

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

function ReportsLineChart({ color, title, description, chart, children, isLoading }) {
    const { data, options } = config(chart.labels || [], chart.datasets || {});

    return (
        <Card sx={{ height: "100%" }}>
            <Box padding="1rem">
                {isLoading && <CircularProgress/>}
                {useMemo(
                    () => 
                        <Box
                            variant="gradient"
                            bgColor={color}
                            borderRadius="lg"
                            coloredShadow={color}
                            py={2}
                            pr={0.5}
                            mt={-5}
                            height="12.5rem"
                        >
                            <Line data={data} options={options} redraw />
                        </Box>
                    ,
                    [chart, color]
                )}
                <Box pt={3} pb={1} px={1}>
                    <Typography variant="h6" textTransform="capitalize">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text" fontWeight="light">
                        {description}
                    </Typography>
                    <Divider />
                    <Box display="flex" alignItems="center">
                        {children}
                    </Box>
                </Box>
            </Box>
        </Card>
    );
}

ReportsLineChart.defaultProps = {
    color: "info",
    description: "",
};

ReportsLineChart.propTypes = {
    color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
    title: PropTypes.string.isRequired,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    children: PropTypes.node,
    isLoading: PropTypes.bool,
    chart: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])).isRequired,
};

export default ReportsLineChart;
