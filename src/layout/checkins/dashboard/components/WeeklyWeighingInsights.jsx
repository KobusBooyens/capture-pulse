import React from "react";
import Typography from "../../../../components/Typography/Typography.jsx";
import { Grid } from "@mui/material";
import StandardStatisticsCard from "../../../../controls/Cards/StatisticsCards/StandardStatisticsCard.jsx";
import dayjs from "dayjs";
import ReportsBarChart from "../../../../controls/Charts/BarCharts/ReportsBarChart/ReportsBarChart.jsx";
import weeklyCheckinBarChartData from "../data/weeklyCheckinBarChartData.js";

const WeeklyWeighingInsights = () => {
    return (
        <>
            <Typography variant={"h4"} color={"secondary"} mb={3}>
                Weekly Insights
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={3}>
                    <StandardStatisticsCard
                        color="info"
                        icon="date_range"
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
                    </StandardStatisticsCard>
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
        </>
    );
};
export default WeeklyWeighingInsights;
