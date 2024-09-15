import React from "react";
import Typography from "../../components/Typography/Typography.jsx";
import Box from "../../components/Box/Box.jsx";
import { Grid } from "@mui/material";
import dayjs from "dayjs";
import Divider from "@mui/material/Divider";
import PercentageStatisticsCard from "../../controls/Cards/StatisticsCards/PercentageStatisticsCard.jsx";
import ReportsBarChart from "../../controls/Charts/BarCharts/ReportsBarChart/ReportsBarChart.jsx";
import PieChart from "../../controls/Charts/PieChart/PieChart.jsx";
import dailyCheckinBarChartData from "./dashboard/dailyCheckinBarChartData.js";
import weeklyCheckinBarChartData from "./dashboard/weeklyCheckinBarChartData.js";
import dailyCheckinMoodPieChartData from "./dashboard/dailyCheckinMoodPieChartData.js";
import Icon from "@mui/material/Icon";

// Get the current week of the month
const getWeekOfMonth = (date) => {
    const startOfMonth = dayjs(date).startOf("month");
    const currentDay = dayjs(date);
    return Math.ceil(currentDay.diff(startOfMonth, "day") / 7);
};

const CheckinsMain = () => {
    return (
        <>
            <Box py={3}>
                <Typography variant={"h3"} color={"secondary"} mb={3}>
          General Check-ins
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={3} mb={3}>
                        <PercentageStatisticsCard
                            color="primary"
                            icon="today"
                            title="Total Checkins this week"
                            percentage={Math.round(12 / 100 * 100)}
                            titleContent="12/100"
                        >
                            <Typography component="p" variant="button" color="text" display="flex">
                                <Typography component="span" variant="button" fontWeight="bold" color={"primary"}>
                                    {`Week ${getWeekOfMonth(dayjs())}`}
                                </Typography>
                &nbsp;
                                {`${dayjs().startOf("week").format("ddd, D MMM")} - 
                                ${dayjs().endOf("week").format("ddd, D MMM")}`}
                            </Typography>
                        </PercentageStatisticsCard>
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <PercentageStatisticsCard
                            color="primary"
                            icon="date_range"
                            title="Total Checkins this month"
                            percentage={Math.round(44 / 400 * 100)}
                            titleContent="44/400"
                        >
                            <Typography component="p" variant="button" color="text" display="flex">
                                <Typography component="span" variant="button" fontWeight="bold" color={"primary"}>
                                    {dayjs().format("MMMM")}
                                </Typography>
                &nbsp;
                                {`${dayjs().startOf("month").format("ddd, D MMM")} - 
                                ${dayjs().endOf("month").format("ddd, D MMM")}`}
                            </Typography>
                        </PercentageStatisticsCard>
                    </Grid>
                </Grid>
            </Box>

            {/* Charts Section */}
            <Box >
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={4} mb={3}>
                        <ReportsBarChart
                            color="primary"
                            title={`Daily Checkins - Week ${getWeekOfMonth(dayjs())}`}
                            chart={dailyCheckinBarChartData}
                        >
                            <Typography component="p" variant="button" color="text" display="flex" gap={2}>
                                <Icon fontSize={"medium"} color={"success"}>trending_up</Icon>
                                <Typography variant="button" color="text">Last week</Typography>
                            </Typography>
                        </ReportsBarChart>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4} mb={3}>
                        <ReportsBarChart
                            color="primary"
                            title={`Weekly Checkins - ${dayjs().format("MMMM")}`}
                            chart={weeklyCheckinBarChartData}
                        >
                            <Typography component="p" variant="button" color="text" display="flex" gap={2}>
                                <Icon fontSize={"medium"} color={"error"}>trending_down</Icon>
                                <Typography variant="button" color="text">Last Month</Typography>
                            </Typography>
                        </ReportsBarChart>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4} mb={3}>
                        <PieChart
                            title={"Mood"}
                            description={"Average mood this week"}
                            chart={dailyCheckinMoodPieChartData}
                            icon={{ color: "primary", component: <Icon>mood</Icon> }}
                        />
                    </Grid>
                </Grid>
            </Box>

            <Box pt={3}>
                <Divider />
            </Box>

            {/* Weighing Check-ins Section */}
            <Box py={3}>
                <Typography variant={"h3"} color={"secondary"} mb={3}>
          Weighing Check-ins
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={3}>
                        <PercentageStatisticsCard
                            color="info"
                            icon="person_add"
                            title="Total Weighings this week"
                            percentage={Math.round(50 / 100 * 100)}
                            titleContent="50/100"
                        >
                            <Typography component="p" variant="button" color="text" display="flex">
                                <Typography component="span" variant="button" fontWeight="bold" color={"primary"}>
                                    {`Week ${getWeekOfMonth(dayjs())}`}
                                </Typography>
                &nbsp;
                                {`${dayjs().startOf("week").format("ddd, D MMM")} - 
                                ${dayjs().endOf("week").format("ddd, D MMM")}`}
                            </Typography>
                        </PercentageStatisticsCard>
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <PercentageStatisticsCard
                            color="info"
                            icon="person_add"
                            title="Total Weighings this month"
                            percentage={Math.round(60 / 400 * 100)}
                            titleContent="60/400"
                        >
                            <Typography component="p" variant="button" color="text" display="flex">
                                <Typography component="span" variant="button" fontWeight="bold" color={"primary"}>
                                    {dayjs().format("MMMM")}
                                </Typography>
                &nbsp;
                                {`${dayjs().startOf("month").format("ddd, D MMM")} - 
                                ${dayjs().endOf("month").format("ddd, D MMM")}`}
                            </Typography>
                        </PercentageStatisticsCard>
                    </Grid>
                </Grid>
            </Box>

            <Box mt={4.5}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={4}>
                        <ReportsBarChart
                            color="info"
                            title={`Daily Checkins - Week ${getWeekOfMonth(dayjs())}`}
                            date="Latest client joined 2 days ago"
                            chart={dailyCheckinBarChartData}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <ReportsBarChart
                            color="info"
                            title={`Weekly Checkins - ${dayjs().format("MMMM")}`}
                            date="Latest client joined 2 days ago"
                            chart={weeklyCheckinBarChartData}
                        />
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default CheckinsMain;
