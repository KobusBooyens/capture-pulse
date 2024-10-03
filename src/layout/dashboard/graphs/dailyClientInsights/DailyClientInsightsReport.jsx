import React, { useEffect, useState } from "react";
import ReportsBarChart from "../../../../controls/Charts/BarCharts/ReportsBarChart/ReportsBarChart.jsx";
import {
    useDashboardClientDailyInsights
} from "../../../../api/dashboard/useDashboardFetch.js";
import useDailyClientInsightsData from "./useDailyClientInsightsData.js";
import Typography from "../../../../components/Typography/Typography.jsx";
import Box from "../../../../components/Box/Box.jsx";
import { Chip } from "@mui/material";
import dayjs from "dayjs";
import ReportTrending from "../components/ReportTrending.jsx";

const DailyClientInsightsReport = () => {
    const clientDailyInsights = useDashboardClientDailyInsights();
    const barChartData = useDailyClientInsightsData(clientDailyInsights.data);

    const [totalCountValue, setTotalCountValue] = useState(0);

    useEffect(() => {
        if (!clientDailyInsights.isPending && clientDailyInsights.data) {
            const totalCount = clientDailyInsights?.data.reduce((acc, record) => {
                acc.totalCountValue += record.count;
                return acc;
            }, { totalCountValue: 0 });
            
            setTotalCountValue(totalCount.totalCountValue);
        }
    }, [clientDailyInsights.data]);

    const description = "Report reflects the trend for total number of " +
      "clients who have joined and left throughout the week";

    const Title = () => {
        return (
            <Box display={"flex"} gap={2} justifyContent={"space-between"}>
                <Typography variant="h6" textTransform="capitalize">
                  Daily Client Insights
                </Typography>
                <Chip title={"Day of week"} label={
                    <Typography variant="h6" fontWeight={"light"}>
                        {dayjs().format("dddd")}
                    </Typography>
                }/>
            </Box>
        );
    };

    return (
        <ReportsBarChart
            color="info"
            title={<Title/>}
            description={description}
            chart={barChartData}
            isLoading={clientDailyInsights.isLoading}
        >
            <ReportTrending totalUp={totalCountValue} totalDown={0}/>
        </ReportsBarChart>
    );
};
export default DailyClientInsightsReport;
