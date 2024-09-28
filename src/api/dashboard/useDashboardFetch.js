import useCustomFetch from "../_shared/useCustomFetch.js";
import queryKeys from "./useQueryKeys.js";

const useDashboardClientSummary = () => {
    return useCustomFetch(queryKeys.clientSummary, "/dashboard/client-summary");
};

const useDashboardClientDailyInsights = () => {
    return useCustomFetch(queryKeys.clientDailyInsights, "/dashboard/client-daily-insights");
};

const useDashboardClientWeeklyInsights = () => {
    return useCustomFetch(queryKeys.clientWeeklyInsights, "/dashboard/client-weekly-insights");
};

const useDashboardClientMonthlyInsights = (months) => {
    return useCustomFetch(queryKeys.clientMonthlyInsights, `/dashboard/client-monthly-insights?months=${months}`);
};

const useDashboardCheckinSummary = () => {
    return useCustomFetch(queryKeys.checkinSummary, "/dashboard/checkin-summary");
};

const useDashboardBillingSummary = () => {
    return useCustomFetch(queryKeys.checkinSummary, "/dashboard/billing-summary");
};

export {
    useDashboardClientSummary,
    useDashboardClientDailyInsights, useDashboardClientWeeklyInsights, useDashboardClientMonthlyInsights,
    useDashboardCheckinSummary, useDashboardBillingSummary };