import React from "react";
import Typography from "../../components/Typography/Typography.jsx";
import Box from "../../components/Box/Box.jsx";
import { Grid } from "@mui/material";
import dayjs from "dayjs";
import PercentageStatisticsCard from "../../controls/Cards/StatisticsCards/PercentageStatisticsCard.jsx";
import Divider from "@mui/material/Divider";
import ReportsBarChart from "../../controls/Charts/BarCharts/ReportsBarChart/ReportsBarChart.jsx";
import dailyCheckinBarChartData from "./dashboard/dailyCheckinBarChartData.js";
import monthlyCheckinBarChartData from "./dashboard/monthlyCheckinBarChartData.js";

const getWeekOfMonth = (date) => {
    const startOfMonth = dayjs(date).startOf("month");
    const currentDay = dayjs(date);

    return Math.ceil(currentDay.diff(startOfMonth, "day") / 7);
};

const CheckinsMain = () => {
    return (
        <>
            <Box py={3}>
                <Typography variant={"h3"} color={"secondary"} mb={3}>General Check-ins</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={3}>
                        <Box mb={1.5} >
                            <PercentageStatisticsCard
                                color="primary"
                                icon="person_add"
                                title="Total Checkins this week"
                                percentage={Math.round(12/100*100)}
                                titleContent="12/100"
                            >
                                <Typography component="p" variant="button" color="text" display="flex">
                                    <Typography
                                        component="span"
                                        variant="button"
                                        fontWeight="bold"
                                        color={"primary"}>
                                        {`Week ${getWeekOfMonth(dayjs())}`}
                                    </Typography>
                          &nbsp;{
                                        `${dayjs()
                                            .startOf("week")
                                            .format("ddd, D MMM")} - ` +
                                  `${dayjs()
                                      .endOf("week")
                                      .format("ddd, D MMM")}`}
                                </Typography>
                            </PercentageStatisticsCard>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <Box mb={1.5}>
                            <PercentageStatisticsCard
                                color="primary"
                                icon="person_add"
                                title="Total Checkins this month"
                                percentage={Math.round(44/400*100)}
                                titleContent="44/400"
                            >
                                <Typography component="p" variant="button" color="text" display="flex">
                                    <Typography
                                        component="span"
                                        variant="button"
                                        fontWeight="bold"
                                        color={"primary"}>
                                        {`${dayjs().format("MMMM")}`}
                                    </Typography>
                              &nbsp;{
                                        `${dayjs()
                                            .startOf("month")
                                            .format("ddd, D MMM")} - ` +
                              `${dayjs()
                                  .endOf("month")
                                  .format("ddd, D MMM")}`}
                                </Typography>

                            </PercentageStatisticsCard>
                        </Box>
                    </Grid>
                    
                </Grid>
            </Box>
            <Box mt={4.5}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={4}>
                        <Box mb={3}>
                            <ReportsBarChart
                                color="primary"
                                title={`Daily Checkins - week ${getWeekOfMonth(dayjs())}`}
                                date="latest client joined 2 days ago"
                                chart={dailyCheckinBarChartData}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <Box mb={3}>
                            <ReportsBarChart
                                color="primary"
                                title={`Weekly Checkins - ${dayjs().format("MMMM")}`}
                                date="latest client joined 2 days ago"
                                chart={monthlyCheckinBarChartData}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Divider/>
            <Box py={3}>
                <Typography variant={"h3"} color={"secondary"} mb={3}>Weighing Check-ins</Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={3}>
                        <Box mb={1.5} >
                            <PercentageStatisticsCard
                                color="info"
                                icon="person_add"
                                title="Total Weighings this week"
                                percentage={Math.round(50/100*100)}
                                titleContent="50/100"
                            >
                                <Typography component="p" variant="button" color="text" display="flex">
                                    <Typography
                                        component="span"
                                        variant="button"
                                        fontWeight="bold"
                                        color={"primary"}>
                                        {`Week ${getWeekOfMonth(dayjs())}`}
                                    </Typography>
                      &nbsp;{
                                        `${dayjs()
                                            .startOf("week")
                                            .format("ddd, D MMM")} - ` +
                      `${dayjs()
                          .endOf("week")
                          .format("ddd, D MMM")}`}
                                </Typography>
                            </PercentageStatisticsCard>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <Box mb={1.5}>
                            <PercentageStatisticsCard
                                color="info"
                                icon="person_add"
                                title="Total Weighings this month"
                                percentage={Math.round(60/400*100)}
                                titleContent="60/400"
                            >
                                <Typography component="p" variant="button" color="text" display="flex">
                                    <Typography
                                        component="span"
                                        variant="button"
                                        fontWeight="bold"
                                        color={"primary"}>
                                        {`${dayjs().format("MMMM")}`}
                                    </Typography>
                      &nbsp;{
                                        `${dayjs()
                                            .startOf("month")
                                            .format("ddd, D MMM")} - ` +
                      `${dayjs()
                          .endOf("month")
                          .format("ddd, D MMM")}`}
                                </Typography>

                            </PercentageStatisticsCard>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box mt={4.5}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={4}>
                        <Box mb={3}>
                            <ReportsBarChart
                                color="info"
                                title={`Daily Checkins - week ${getWeekOfMonth(dayjs())}`}
                                date="latest client joined 2 days ago"
                                chart={dailyCheckinBarChartData}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <Box mb={3}>
                            <ReportsBarChart
                                color="info"
                                title={`Weekly Checkins - ${dayjs().format("MMMM")}`}
                                date="latest client joined 2 days ago"
                                chart={monthlyCheckinBarChartData}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default CheckinsMain;
