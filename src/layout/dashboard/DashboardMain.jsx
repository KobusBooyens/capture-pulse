import React from "react";
import Box from "../../components/Box/Box.jsx";
import { Grid } from "@mui/material";
import ComplexStatisticsCard from "../../controls/Cards/StatisticsCards/ComplexStatisticsCard.jsx";
import ReportsBarChart from "../../controls/Charts/BarCharts/ReportsBarChart/ReportsBarChart.jsx";
import ReportsLineChart from "../../controls/Charts/LineCharts/ReportsLineChart/ReportLineChart.jsx";

import reportsBarChartData from "./data/reportsBarChartData";
import reportsLineChartData from "./data/reportsLineChartData";
import Typography from "../../components/Typography/Typography.jsx";
import dayjs from "dayjs";
import { useDashboardClientSummary } from "../../api/dashboard/useDashboardFetch.js";
import TotalClientsCard from "./components/TotalClientsCard.jsx";
import TotalNewClients from "./components/TotalNewClients.jsx";

const DashboardMain = () => {
    const { joined, payments } = reportsLineChartData;

    const clientSummary = useDashboardClientSummary();

    return (
        <>
            <Box py={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={3}>
                        <Box mb={1.5}>
                            <TotalClientsCard {...clientSummary.data} isLoading={clientSummary.isLoading}/>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <Box mb={1.5} >
                            <TotalNewClients {...clientSummary.data} isLoading={clientSummary.isLoading}/>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <Box mb={1.5}>
                            <ComplexStatisticsCard
                                icon="settings_accessibility"
                                title="Check-ins"
                                titleContent="150"
                            >
                                <Typography component="p" variant="button" color="text" display="flex" gap={1}>
                                    <Typography
                                        component="span"
                                        variant="button"
                                        fontWeight="bold"
                                        color={"warning"}>
                                        {"Remaining"}
                                    </Typography>
                                    {"131"}
                                </Typography>
                            </ComplexStatisticsCard>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <Box mb={1.5}>
                            <ComplexStatisticsCard
                                color="success"
                                icon="receipt_long"
                                title="BillingMain"
                                titleContent="4500"
                            >
                                <Typography component="p" variant="button" color="text" display="flex" gap={1}>
                                    <Typography
                                        component="span"
                                        variant="button"
                                        fontWeight="bold"
                                        color={"error"}>
                                        {"To be collected"}
                                    </Typography>
                                    {"4800"}
                                </Typography>
                            </ComplexStatisticsCard>
                        </Box>
                    </Grid>
                </Grid>
                <Box mt={4.5}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={4}>
                            <Box mb={3}>
                                <ReportsBarChart
                                    color="info"
                                    title="New Clients"
                                    description="Weekly insights"
                                    date="latest client joined 2 days ago"
                                    chart={reportsBarChartData}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <Box mb={3}>
                                <ReportsLineChart
                                    color="success"
                                    title="New Clients"
                                    description="Monthly insights"
                                    date="updated 4 min ago"
                                    chart={joined}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <Box mb={3}>
                                <ReportsLineChart
                                    color="dark"
                                    title="BillingMain"
                                    description="Payments Received Insights"
                                    date="just updated"
                                    chart={payments}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
};
export default DashboardMain;
