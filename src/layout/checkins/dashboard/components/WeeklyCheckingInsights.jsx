import React from "react";
import Typography from "../../../../components/Typography/Typography.jsx";
import { Grid } from "@mui/material";
import PercentageStatisticsCard from "../../../../controls/Cards/StatisticsCards/PercentageStatisticsCard.jsx";
import dayjs from "dayjs";
import ReportsBarChart from "../../../../controls/Charts/BarCharts/ReportsBarChart/ReportsBarChart.jsx";
import weeklyCheckinBarChartData from "../data/weeklyCheckinBarChartData.js";
import Icon from "@mui/material/Icon";
import PieChart from "../../../../controls/Charts/PieChart/PieChart.jsx";
import dailyCheckinMoodPieChartData from "../data/dailyCheckinMoodPieChartData.js";

const WeeklyCheckingInsights = () => {
    return (
        <>
            <Typography variant={"h4"} color={"secondary"} mb={3}>
            Weekly Insights
            </Typography>
            <Grid container spacing={2}>
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
                        description={"Average mood this month"}
                        chart={dailyCheckinMoodPieChartData}
                        icon={{ color: "primary", component: <Icon>mood</Icon> }}
                    />
                </Grid>
            </Grid>
        </>
    );
};
export default WeeklyCheckingInsights;
