import React, { useEffect, useState } from "react";
import ReportsLineChart from "../../../../controls/Charts/LineCharts/ReportsLineChart/ReportLineChart.jsx";
import Typography from "../../../../components/Typography/Typography.jsx";
import Icon from "@mui/material/Icon";
import Box from "../../../../components/Box/Box.jsx";
import { Chip } from "@mui/material";
import dayjs from "dayjs";
import { useDashboardClientMonthlyInsights } from "../../../../api/dashboard/useDashboardFetch.js";
import useMonthlyClientInsightsData from "./useMonthlyClientInsightsData.js";
import ReportTrending from "../components/ReportTrending.jsx";

const MonthlyClientInsightsReport = () => {
    const monthlyClientInsights = useDashboardClientMonthlyInsights(6);
    const reportData = useMonthlyClientInsightsData(monthlyClientInsights.data);

    const [totalCountValue, setTotalCountValue] = useState(0);

    useEffect(() => {
        if (!monthlyClientInsights.isPending && monthlyClientInsights.data) {
            const totalCount = monthlyClientInsights?.data.reduce((acc, record) => {
                acc.totalCountValue += record.totalCount;
                return acc;
            }, { totalCountValue: 0 });

            setTotalCountValue(totalCount.totalCountValue);
        }
    }, [monthlyClientInsights.data]);

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
                <ReportTrending totalUp={totalCountValue} totalDown={2}/>
            </Box>
        </ReportsLineChart>
    );
};
export default MonthlyClientInsightsReport;
