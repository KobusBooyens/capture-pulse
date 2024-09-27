import React from "react";
import reportsBarChartData from "../data/reportsBarChartData.js";
import ReportsBarChart from "../../../controls/Charts/BarCharts/ReportsBarChart/ReportsBarChart.jsx";
import { useDashboardClientWeeklySummary } from "../../../api/dashboard/useDashboardFetch.js";

const WeeklyNewClientsBarChart = ({}) => {
    const clientWeeklySummary = useDashboardClientWeeklySummary();

    const labels = ["M", "T", "W", "T", "F", "S", "S"];
    const data = new Array(labels.length).fill(0);

    clientWeeklySummary?.data.forEach(({ day, count }) => {
        const dayIndex = day - 1;
        if (dayIndex >= 0 && dayIndex < data.length) {
            data[dayIndex] = count;
        }
    });

    console.log("data", data);

    const chartData = {
        labels: labels,
        datasets:
            {
                label: "Joined",
                data: data
            }

    };

    // console.log("chartData", chartData);
    console.log("reportsBarChartData", reportsBarChartData);
    // const data = {
    //     labels: ["M", "T", "W", "T", "F", "S", "S"],
    //     datasets: { label: "Joined", data: [50, 20, 10, 22, 50, 0, 0] },
    // };

    return (
        <ReportsBarChart
            color="info"
            title="New Clients"
            description="Weekly insights"
            chart={chartData}
            isLoading={clientWeeklySummary.isLoading}
        />
    );
};
export default WeeklyNewClientsBarChart;
