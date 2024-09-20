import React from "react";
import Typography from "../../components/Typography/Typography.jsx";
import Box from "../../components/Box/Box.jsx";
import { Grid } from "@mui/material";
import dayjs from "dayjs";
import Divider from "@mui/material/Divider";
import PercentageStatisticsCard from "../../controls/Cards/StatisticsCards/PercentageStatisticsCard.jsx";
import ReportsBarChart from "../../controls/Charts/BarCharts/ReportsBarChart/ReportsBarChart.jsx";
import PieChart from "../../controls/Charts/PieChart/PieChart.jsx";
import dailyCheckinBarChartData from "./dashboard/data/dailyCheckinBarChartData.js";
import weeklyCheckinBarChartData from "./dashboard/data/weeklyCheckinBarChartData.js";
import dailyCheckinMoodPieChartData from "./dashboard/data/dailyCheckinMoodPieChartData.js";
import Icon from "@mui/material/Icon";
import DailyCheckinInsights from "./dashboard/components/DailyCheckinInsights.jsx";
import WeeklyCheckingInsights from "./dashboard/components/WeeklyCheckingInsights.jsx";
import WeeklyWeighingInsights from "./dashboard/components/WeeklyWeighingInsights.jsx";

const CheckinsMain = () => {
    return (
        <>
            <Box py={3}>
                <Typography variant={"h3"} color={"secondary"} mb={3}>
          General Check-ins
                </Typography>
                <DailyCheckinInsights/>
                <WeeklyCheckingInsights/>
            </Box>

            <Box pt={3}>
                <Divider />
            </Box>

            {/* Weighing Check-ins Section */}
            <Box py={3}>
                <Typography variant={"h3"} color={"secondary"} mb={3}>
          Weighing Check-ins
                </Typography>
                <WeeklyWeighingInsights/>
            </Box>
        </>
    );
};

export default CheckinsMain;
