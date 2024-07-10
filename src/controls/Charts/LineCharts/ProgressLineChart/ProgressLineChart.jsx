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
import config from "./config.js";
import Box from "../../../../components/Box/Box.jsx";
import Typography from "../../../../components/Typography/Typography.jsx";
import Progress from "../../../../components/Progress/Progress.jsx";

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

function ProgressLineChart({ color, icon, title, count, progress, height, chart }) {
    const { data, options } = config(color, chart.labels || [], title, chart.data || []);

    return (
        <Card>
            <Box display="flex" alignItems="center" pt={2} px={2}>
                <Box
                    width="3rem"
                    height="3rem"
                    display="grid"
                    justifyContent="center"
                    alignItems="center"
                    borderRadius="md"
                    shadow="md"
                    color="white"
                    bgColor={color}
                    variant="gradient"
                >
                    <Icon fontSize="default">{icon}</Icon>
                </Box>
                <Box ml={2} lineHeight={1}>
                    <Typography
                        variant="button"
                        fontWeight="regular"
                        textTransform="capitalize"
                        color="text"
                    >
                        {title}
                    </Typography>
                    {count ? 
                        <Typography variant="h5" fontWeight="bold">
                            {count}
                        </Typography>
                        : null}
                </Box>
                <Box width="25%" ml="auto">
                    <Typography display="block" variant="caption" fontWeight="medium" color="text">
                        {progress}%
                    </Typography>
                    <Box mt={0.25}>
                        <Progress variant="gradient" color={color} value={progress} />
                    </Box>
                </Box>
            </Box>
            {useMemo(
                () => 
                    <Box mt={2}>
                        <Line data={data} options={options} style={{ height }} redraw />
                    </Box>
                ,
                [chart, height, color]
            )}
        </Card>
    );
}

// Setting default values for the props of ProgressLineChart
ProgressLineChart.defaultProps = {
    color: "info",
    count: 0,
    height: "6.25rem",
};

// Typechecking props for the ProgressLineChart
ProgressLineChart.propTypes = {
    color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    progress: PropTypes.number.isRequired,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    chart: PropTypes.objectOf(PropTypes.array).isRequired,
};

export default ProgressLineChart;
