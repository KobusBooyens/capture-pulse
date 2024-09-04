import React from "react";
import Box from "../../components/Box/Box.jsx";
import { Grid } from "@mui/material";
import ComplexStatisticsCard from "../../controls/Cards/StatisticsCards/ComplexStatisticsCard.jsx";
import ReportsBarChart from "../../controls/Charts/BarCharts/ReportsBarChart/ReportsBarChart.jsx";
import ReportsLineChart from "../../controls/Charts/LineCharts/ReportsLineChart/ReportLineChart.jsx";

import reportsBarChartData from "./data/reportsBarChartData";
import reportsLineChartData from "./data/reportsLineChartData";
import Typography from "../../components/Typography/Typography.jsx";

const DashboardMain = () => {
    const { joined, payments } = reportsLineChartData;

    return (
        <>
            <Box py={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={3}>
                        <Box mb={1.5} >
                            <ComplexStatisticsCard
                                color="primary"
                                icon="person_add"
                                title="New ClientsMain"
                                count="+12"
                            >
                                <Typography component="p" variant="button" color="text" display="flex">
                                    <Typography
                                        component="span"
                                        variant="button"
                                        fontWeight="bold"
                                        color={"success"}>
                                        {""}
                                    </Typography>
                                &nbsp;{"Just updated"}
                                </Typography>
                            </ComplexStatisticsCard>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <Box mb={1.5}>
                            <ComplexStatisticsCard
                                color="dark"
                                icon="people_alt"
                                title="Total ClientsMain"
                                count={281}
                            >
                                <Typography component="p" variant="button" color="text" display="flex" gap={1}>
                                    <Typography
                                        component="span"
                                        variant="button"
                                        fontWeight="bold"
                                        color={"info"}>
                                        {"Male"}
                                    </Typography>
                                    {"81"}
                                    <Typography
                                        component="span"
                                        variant="button"
                                        fontWeight="bold"
                                        color={"primary"}>
                                        {"Female"}
                                    </Typography>
                                    {"200"}
                                </Typography>
                            </ComplexStatisticsCard>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <Box mb={1.5}>
                            <ComplexStatisticsCard
                                icon="settings_accessibility"
                                title="Check-ins"
                                count="150"
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
                                count="4500"
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
                                    title="ClientsMain"
                                    description="Weekly insights"
                                    date="latest user joined 2 days ago"
                                    chart={reportsBarChartData}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <Box mb={3}>
                                <ReportsLineChart
                                    color="success"
                                    title="ClientsMain"
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
