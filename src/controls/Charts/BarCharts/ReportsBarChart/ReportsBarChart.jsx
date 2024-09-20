import { useMemo } from "react";

import PropTypes from "prop-types";

import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import config from "./config.js";
import Box from "../../../../components/Box/Box.jsx";
import Typography from "../../../../components/Typography/Typography.jsx";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ReportsBarChart({ color, title, description, chart, children }) {
    const { data, options } = config(chart.labels || [], chart.datasets || {});

    return (
        <Card>
            <Box padding="1rem">
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
                            <Bar data={data} options={options} redraw />
                        </Box>
                    ,
                    [color, chart]
                )}
                <Box pt={3} pb={1} px={1}>
                    <Typography variant="h6" textTransform="capitalize">
                        {title}
                    </Typography>
                    <Typography component="div" variant="button" color="text" fontWeight="light">
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

ReportsBarChart.defaultProps = {
    color: "info",
    description: "",
};

ReportsBarChart.propTypes = {
    color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
    title: PropTypes.string.isRequired,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    children: PropTypes.node,
    chart: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])).isRequired,
};

export default ReportsBarChart;
