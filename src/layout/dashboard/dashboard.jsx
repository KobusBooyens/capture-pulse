import React from "react";
import DashboardLayout from "../../controls/LayoutContainers/DashboardLayout.jsx";
import DashboardNavbar from "../../controls/Navbars/DashboardNavbar/DashboardNavbar.jsx";
import Footer from "../../controls/Footer/Footer.jsx";
import Box from "../../components/Box/Box.jsx";
import { Grid } from "@mui/material";
import ComplexStatisticsCard from "../../controls/Cards/StatisticsCards/ComplexStatisticsCard.jsx";
import ReportsBarChart from "../../controls/Charts/BarCharts/ReportsBarChart/ReportsBarChart.jsx";
import ReportsLineChart from "../../controls/Charts/LineCharts/ReportsLineChart/ReportLineChart.jsx";

import reportsBarChartData from "./data/reportsBarChartData";
import reportsLineChartData from "./data/reportsLineChartData";

const Dashboard = () => {
    const { joined, payments } = reportsLineChartData;
    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <Box py={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={3}>
                        <Box mb={1.5}>
                            <ComplexStatisticsCard
                                color="primary"
                                icon="person_add"
                                title="New Clients"
                                count="+2"
                                percentage={{
                                    color: "success",
                                    amount: "",
                                    label: "Just updated",
                                }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <Box mb={1.5}>
                            <ComplexStatisticsCard
                                color="dark"
                                icon="people_alt"
                                title="Clients"
                                count={281}
                                percentage={{
                                    color: "info",
                                    amount: "Male",
                                    label: "25",
                                }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <Box mb={1.5}>
                            <ComplexStatisticsCard
                                icon="settings_accessibility"
                                title="Check-ins"
                                count="150"
                                percentage={{
                                    color: "warning",
                                    amount: "185",
                                    label: "remaining",
                                }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <Box mb={1.5}>
                            <ComplexStatisticsCard
                                color="success"
                                icon="receipt_long"
                                title="Billing"
                                count="4500"
                                percentage={{
                                    color: "warning",
                                    amount: "4800",
                                    label: "outstanding this month",
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
                <Box mt={4.5}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={4}>
                            <Box mb={3}>
                                <ReportsBarChart
                                    color="info"
                                    title="New Clients Joined"
                                    description="Weekly statistic"
                                    date="latest user joined 2 days ago"
                                    chart={reportsBarChartData}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <Box mb={3}>
                                <ReportsLineChart
                                    color="success"
                                    title="New Clients Joined"
                                    description="Monthly statistic"
                                    date="updated 4 min ago"
                                    chart={joined}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <Box mb={3}>
                                <ReportsLineChart
                                    color="dark"
                                    title="Billing"
                                    description="Cash flow Summary"
                                    date="just updated"
                                    chart={payments}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Footer />
        </DashboardLayout>
    );
};
export default Dashboard;
