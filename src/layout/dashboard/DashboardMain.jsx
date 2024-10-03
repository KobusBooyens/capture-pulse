import React from "react";
import Box from "../../components/Box/Box.jsx";
import { Grid } from "@mui/material";
import ComplexStatisticsCard from "../../controls/Cards/StatisticsCards/ComplexStatisticsCard.jsx";
import ReportsLineChart from "../../controls/Charts/LineCharts/ReportsLineChart/ReportLineChart.jsx";
import reportsLineChartData from "./data/reportsLineChartData.js";
import Typography from "../../components/Typography/Typography.jsx";
import { useDashboardCheckinInsights, useDashboardClientInsights } from "../../api/dashboard/useDashboardFetch.js";
import TotalClients from "./cards/TotalClients.jsx";
import TotalNewClients from "./cards/TotalNewClients.jsx";
import DailyClientInsightsReport from "./graphs/dailyClientInsights/DailyClientInsightsReport.jsx";
import MonthlyClientInsightsReport from "./graphs/monthlyClientInsights/MonthlyClientInsightsReport.jsx";
import WeeklyClientInsightsReport from "./graphs/weeklyClientInsights/WeeklyClientInsightsReport.jsx";
import TotalCheckins from "./cards/TotalCheckins.jsx";
import CardSkeleton from "../../controls/Cards/CardSkeleton.jsx";

const DashboardMain = () => {
    const { joined, payments } = reportsLineChartData;

    const clientInsights = useDashboardClientInsights();
    const checkinInsights = useDashboardCheckinInsights();

    return (
        <>
            <Box py={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={3}>
                        <Box mb={1.5}>
                            <TotalClients {...clientInsights.data} isLoading={clientInsights.isLoading}/>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <Box mb={1.5} >
                            <TotalNewClients {...clientInsights.data} isLoading={clientInsights.isLoading}/>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <Box mb={1.5}>
                            <TotalCheckins {...checkinInsights.data} isLoading={clientInsights.isLoading}/>
                        </Box>
                    </Grid>
                    {/*<Grid item xs={12} md={6} lg={3}>*/}
                    {/*    <Box mb={1.5}>*/}
                    {/*        <ComplexStatisticsCard*/}
                    {/*            color="success"*/}
                    {/*            icon="receipt_long"*/}
                    {/*            title="BillingMain"*/}
                    {/*            titleContent="4500"*/}
                    {/*        >*/}
                    {/*            <Typography component="p" variant="button" color="text" display="flex" gap={1}>*/}
                    {/*                <Typography*/}
                    {/*                    component="span"*/}
                    {/*                    variant="button"*/}
                    {/*                    fontWeight="bold"*/}
                    {/*                    color={"error"}>*/}
                    {/*                    {"To be collected"}*/}
                    {/*                </Typography>*/}
                    {/*                {"4800"}*/}
                    {/*            </Typography>*/}
                    {/*        </ComplexStatisticsCard>*/}
                    {/*    </Box>*/}
                    {/*</Grid>*/}
                </Grid>
                <Box mt={4.5}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={4}>
                            <Box mb={3}>
                                <DailyClientInsightsReport />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <Box mb={3}>
                                <WeeklyClientInsightsReport />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <Box mb={3}>
                                <MonthlyClientInsightsReport/>
                            </Box>
                        </Grid>
                        {/*<Grid item xs={12} md={6} lg={4}>*/}
                        {/*    <Box mb={3}>*/}
                        {/*        <ReportsLineChart*/}
                        {/*            color="dark"*/}
                        {/*            title="BillingMain"*/}
                        {/*            description="Payments Received Insights"*/}
                        {/*            date="just updated"*/}
                        {/*            chart={payments}*/}
                        {/*        />*/}
                        {/*    </Box>*/}
                        {/*</Grid>*/}
                    </Grid>
                </Box>
            </Box>
        </>
    );
};
export default DashboardMain;
