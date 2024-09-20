import React from "react";
import Typography from "../../../../components/Typography/Typography.jsx";
import { Grid } from "@mui/material";
import PercentageStatisticsCard from "../../../../controls/Cards/StatisticsCards/PercentageStatisticsCard.jsx";
import dayjs from "dayjs";
import ReportsBarChart from "../../../../controls/Charts/BarCharts/ReportsBarChart/ReportsBarChart.jsx";
import dailyCheckinBarChartData from "../data/dailyCheckinBarChartData.js";
import Icon from "@mui/material/Icon";
import PieChart from "../../../../controls/Charts/PieChart/PieChart.jsx";
import dailyCheckinMoodPieChartData from "../data/dailyCheckinMoodPieChartData.js";
import Box from "../../../../components/Box/Box.jsx";

// Get the current week of the month
const getWeekOfMonth = (date) => {
    const startOfMonth = dayjs(date).startOf("month");
    const currentDay = dayjs(date);
    return Math.ceil(currentDay.diff(startOfMonth, "day") / 7);
};

const DailyCheckinInsights = () => {
    return (
        <>
            <Typography variant="h4" color="secondary" mb={3}>
        Daily Insights
            </Typography>
            <Grid container spacing={2}>
                {/* Card Section */}
                <Grid item xs={12} md={6} lg={3} mb={3}>
                    <PercentageStatisticsCard
                        color="primary"
                        icon="how_to_reg"
                        title="Total Checkins this week"
                        percentage={Math.round(12 / 100 * 100)}
                        titleContent="12/100"
                    >
                        <Typography component="p" variant="button" color="text" display="flex">
                            <Typography
                                component="span"
                                variant="button"
                                fontWeight="bold"
                                color="primary"
                            >
                                {`Week ${getWeekOfMonth(dayjs())}`}
                            </Typography>
                &nbsp;
                            {`${dayjs().startOf("week").format("ddd, D MMM")} - 
                    ${dayjs().endOf("week").format("ddd, D MMM")}`}
                        </Typography>
                    </PercentageStatisticsCard>
                </Grid>

                {/* Bar Chart */}
                <Grid item xs={12} md={6} lg={4} mb={3}>
                    <ReportsBarChart
                        color="primary"
                        title={`Daily Checkins - Week ${getWeekOfMonth(dayjs())}`}
                        chart={dailyCheckinBarChartData}
                    >
                        <Typography component="p" variant="button" color="text" display="flex" gap={2}>
                            <Icon fontSize="medium" color="success">
                  trending_up
                            </Icon>
                            <Typography variant="button" color="text">
                  Last week
                            </Typography>
                        </Typography>
                    </ReportsBarChart>
                </Grid>

                {/* Pie Chart */}
                <Grid item xs={12} md={6} lg={4}>
                    <PieChart
                        title="Mood"
                        description="Average mood this week"
                        chart={dailyCheckinMoodPieChartData}
                        icon={{ color: "primary", component: <Icon>mood</Icon> }}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default DailyCheckinInsights;
