import React from "react";
import ReportsLineChart from "../../../../controls/Charts/LineCharts/ReportsLineChart/ReportLineChart.jsx";
import reportsLineChartData from "../../data/reportsLineChartData.js";
import Typography from "../../../../components/Typography/Typography.jsx";
import Icon from "@mui/material/Icon";
import Button from "../../../../components/Button/Button.jsx";
import Box from "../../../../components/Box/Box.jsx";
import { Chip } from "@mui/material";
import dayjs from "dayjs";
import { useDashboardClientMonthlyInsights } from "../../../../api/dashboard/useDashboardFetch.js";
import useMonthlyClientInsightsData from "./useMonthlyClientInsightsData.js";

const MonthlyClientInsightsReport = () => {

    const monthlyClientInsights = useDashboardClientMonthlyInsights(6);
    const reportData = useMonthlyClientInsightsData(monthlyClientInsights.data);
    console.log(reportData.datasets.data);
    const description = "Report reflects the trend for total number of " +
      "clients who have joined and left throughout the past 6 months";

    const Title = () => {
        return (
            <Box display={"flex"} gap={2} justifyContent={"space-between"}>
                <Typography variant="h6" textTransform="capitalize">
                  Monthly Client Insights
                </Typography>
                <Chip title={"Current week"} label={
                    <Typography variant="h6" fontWeight={"light"}>
                        { dayjs().format("MMMM")}
                    </Typography>
                }/>
            </Box>
        );
    };

    return (
        <ReportsLineChart
            color="dark"
            title={<Title/>}
            description={description}
            isLoading={monthlyClientInsights.isLoading}
            chart={reportData}
        >
            <Box display="flex" width={"100%"} justifyContent={"center"} gap={5}>
                <Typography color={"success"} variant="body2">
                    <Box display={"flex"} flexDirection={"row"} gap={1} color={"inherit"}>
                        <Icon>trending_up</Icon>
                        {"Total New (+4)"}
                    </Box>

                </Typography>
                <Typography color="error" variant="body2">
                    <Box display={"flex"} flexDirection={"row"} gap={1} color={"inherit"}>
                        <Icon>trending_down</Icon>
                        {"Total left (-3)"}
                    </Box>
                </Typography>
            </Box>
        </ReportsLineChart>
    );
};
export default MonthlyClientInsightsReport;
