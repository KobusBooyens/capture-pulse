import React, { useEffect, useState } from "react";
import ReportsBarChart from "../../../../controls/Charts/BarCharts/ReportsBarChart/ReportsBarChart.jsx";
import { useDashboardClientWeeklyInsights } from "../../../../api/dashboard/useDashboardFetch.js";
import useWeeklyClientInsightsData from "./useWeeklyClientInsightsData.js";
import Typography from "../../../../components/Typography/Typography.jsx";
import Icon from "@mui/material/Icon";
import Box from "../../../../components/Box/Box.jsx";
import { Chip } from "@mui/material";
import dayjs from "dayjs";

const getCurrentWeekOfMonth = () => {
    const currentDate = dayjs();
    const startOfMonth = currentDate.startOf("month");
    return Math.ceil((currentDate.date() + startOfMonth.day()) / 7);
};

const WeeklyClientInsightsReport = () => {
    const clientWeeklyInsights = useDashboardClientWeeklyInsights();
    const barChartData = useWeeklyClientInsightsData(clientWeeklyInsights.data);

    const [totalCountValue, setTotalCountValue] = useState(0);

    useEffect(() => {
        if (!clientWeeklyInsights.isPending && clientWeeklyInsights.data) {
            const totalCount = clientWeeklyInsights?.data.reduce((acc, record) => {
                acc.totalCountValue += record.count;
                return acc;
            }, { totalCountValue: 0 });
            
            setTotalCountValue(totalCount.totalCountValue);
        }
    }, [clientWeeklyInsights.data]);

    const description = "Report reflects the trend for total number of " +
      "clients who have joined and left throughout the month";

    const Title = () => {
        return (
            <Box display={"flex"} gap={2} justifyContent={"space-between"}>
                <Typography variant="h6" textTransform="capitalize">
                  Weekly Client Insights
                </Typography>

                <Chip title={"Current week"} label={
                    <Typography variant="h6" fontWeight={"light"}>
                        {`Week ${getCurrentWeekOfMonth()}`}
                    </Typography>
                }/>
            </Box>
        );
    };

    return (
        <ReportsBarChart
            color="primary"
            title={<Title/>}
            description={description}
            chart={barChartData}
            isLoading={clientWeeklyInsights.isLoading}
        >
            <Box display="flex" width={"100%"} justifyContent={"center"} gap={5}>
                <Typography color={"success"} variant="body2">
                    <Box display={"flex"} flexDirection={"row"} gap={1} color={"inherit"}>
                        <Icon>trending_up</Icon>
                        {"Total New (+2)"}
                    </Box>

                </Typography>
                <Typography color="error" variant="body2">
                    <Box display={"flex"} flexDirection={"row"} gap={1} color={"inherit"}>
                        <Icon>trending_down</Icon>
                        {"Total left (-1)"}
                    </Box>
                </Typography>
            </Box>
        </ReportsBarChart>
    );
};
export default WeeklyClientInsightsReport;
