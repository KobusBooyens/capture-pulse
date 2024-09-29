import React, { useEffect, useState } from "react";
import ReportsBarChart from "../../../../controls/Charts/BarCharts/ReportsBarChart/ReportsBarChart.jsx";
import { useDashboardClientWeeklyInsights } from "../../../../api/dashboard/useDashboardFetch.js";
import useWeeklyClientInsightsData from "./useWeeklyClientInsightsData.js";
import Typography from "../../../../components/Typography/Typography.jsx";
import Box from "../../../../components/Box/Box.jsx";
import { Chip } from "@mui/material";
import ReportTrending from "../components/ReportTrending.jsx";
import { getWeekOfMonth } from "../../../../utils/functions.js";

const WeeklyClientInsightsReport = () => {
    const clientWeeklyInsights = useDashboardClientWeeklyInsights();
    const barChartData = useWeeklyClientInsightsData(clientWeeklyInsights.data);

    const [totalCountValue, setTotalCountValue] = useState(0);

    useEffect(() => {
        if (!clientWeeklyInsights.isPending && clientWeeklyInsights.data) {
            const totalCount = clientWeeklyInsights?.data.reduce((acc, record) => {
                acc.totalCountValue += record.totalCount;
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
                        {`Week ${getWeekOfMonth()}`}
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
            <ReportTrending totalUp={totalCountValue} totalDown={0}/>
        </ReportsBarChart>
    );
};
export default WeeklyClientInsightsReport;
