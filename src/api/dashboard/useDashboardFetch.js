import useCustomFetch from "../_shared/useCustomFetch.js";
import queryKeys from "./useQueryKeys.js";

const useDashboardClientInsights = () => {
    return useCustomFetch(queryKeys.clientInsights, "/dashboard/client-insights");
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

const useDashboardCheckinInsights = () => {
    return useCustomFetch(queryKeys.checkinInsights, "/dashboard/checkin-insights");
};

const useDashboardBillingInsights = () => {
    return useCustomFetch(queryKeys.billingInsights, "/dashboard/billing-insights");
};

export {
    useDashboardClientInsights,
    useDashboardClientDailyInsights, useDashboardClientWeeklyInsights, useDashboardClientMonthlyInsights,
    useDashboardCheckinInsights, useDashboardBillingInsights };